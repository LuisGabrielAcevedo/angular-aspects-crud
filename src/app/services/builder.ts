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
    : await this.buildAspects();

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
        this.search_fields = resp.search_fields;
        resp.aspects.forEach(aspect => {
          const aspectInstance = this.getAspectFor(aspect);
          this.aspects_table.push(aspectInstance);
        });
        resolve(this.aspects_table);
      });
    });
  }

  private getAspectFor = (aspect: AspectInterface): Aspect =>
    new Aspect(
      aspect.name,
      aspect.accessor,
      aspect.type,
      aspect.default_value,
      aspect.nullable,
      aspect.options
    );
}
