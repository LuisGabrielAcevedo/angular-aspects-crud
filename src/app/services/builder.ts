import { Aspect } from './aspect';
import { Observable } from 'rxjs';
import { AspectInterface } from 'src/app/interfaces/aspect';
import { AspectsResponseInterface } from '../interfaces/aspects-response';

export class Builder {
  model_class;
  _aspects: Aspect[] = [];
  index_aspects: Aspect[] = [];
  search_fields: string[] = [];
  constructor(model_class) {
    this.model_class = model_class;
  }

  private getAspects = (): Observable<AspectsResponseInterface> => 
  this.model_class.getAspectsFromAPI();

  public aspects = async (): Promise<Aspect[]> => this._aspects.length
    ? this._aspects
    : await this.buildAspects('aspects');

  public indexAspects = async (): Promise<Aspect[]> => this.index_aspects.length
    ? this.index_aspects
    : await this.buildAspects('index_aspects');

  public async formAspects(): Promise<Aspect[]> {
    const aspects_table = await this.aspects();
    return aspects_table.filter(aspect => aspect.isEditable());
  }

  public async importableAspects(): Promise<Aspect[]> {
    const aspects_table = await this.aspects();
    return aspects_table.filter(aspect => aspect.isImportable());
  }

  private buildAspects(key: string): Promise<Aspect[]> {
    return new Promise((resolve) => {
      this.getAspects().subscribe(resp => {
        resp.aspects.forEach(aspect => this._aspects.push(this.getAspectFromApiObject(aspect)));
        resp.index_aspects.forEach(aspect => this.index_aspects.push(this.getAspectFromApiObject(aspect)));
        this.customizeAspects();
        this.setSearch(resp.search_fields);
        resolve(key === 'aspects' ? this._aspects : this.index_aspects);
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

  public customizeAspects(){}

  public setSearch = (args) => this.search_fields = args;
}
