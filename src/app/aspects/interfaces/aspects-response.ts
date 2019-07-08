import { AspectElementsInterface } from './aspect-elements';

export interface AspectsResponseInterface {
  model_class: string;
  aspects: AspectElementsInterface[];
  search_fields: {[key: string]: string[]};
}
