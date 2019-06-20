import { Aspect } from './aspect';
import { Observable } from 'rxjs';
import { AspectInterface } from 'src/app/interfaces/aspect';
import { AspectsResponseInterface } from '../interfaces/aspects-response';

export class Builder {
  model_class;
  aspects_table: Aspect[] = [];
  search_fields: string[] = [];
  constructor(model_class) {
    this.model_class = model_class;
  }

  public aspects = async (): Promise<Aspect[]> => this.aspects_table.length
    ? this.aspects_table
    : await this.buildAspects()

  public async indexAspects(): Promise<Aspect[]> {
    const aspects_table = await this.aspects();
    return aspects_table.filter(aspect => aspect.isVisible());
  }

  public async formAspects(): Promise<Aspect[]> {
    const aspects_table = await this.aspects();
    return aspects_table.filter(aspect => aspect.isEditable());
  }

  public async importableAspects(): Promise<Aspect[]> {
    const aspects_table = await this.aspects();
    return aspects_table.filter(aspect => aspect.isImportable());
  }

  private getAspects = (): Observable<AspectsResponseInterface> => this.model_class.getAspectsFromAPI();

  private buildAspects(): Promise<Aspect[]> {
    return new Promise((resolve) => {
      this.getAspects().subscribe(resp => {
        resp.aspects.forEach(aspect => this.aspects_table.push(this.getAspectFromApiObject(aspect)));
        this.setSearch(resp.search_fields);
        this.customizeAspects();
        resolve(this.aspects_table);
      });
    });
  }

  private getAspectFromApiObject = (aspect: AspectInterface): Aspect =>
    new Aspect(
      aspect.name,
      aspect.accessor,
      aspect.type,
      aspect.default_value,
      aspect.nullable,
      aspect.options
    );

  // This is the #customize_aspects hook for customization
  public customizeAspects(){
    // Do nothing for now
  }

  public setSearch(args){
    this.search_fields = args;
  }
}
