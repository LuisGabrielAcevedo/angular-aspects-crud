import { AspectInterface } from "./aspect";

export interface AspectsResponseInterface {
  model_class: string;
  aspects: AspectInterface[];
  index_aspects: AspectInterface[];
  search_fields: string[];
}
