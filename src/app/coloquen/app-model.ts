import { Model } from 'coloquent';
export class AppModel extends Model {
  getJsonApiBaseUrl(): string {
    return 'https://api-crud-test.herokuapp.com';
  }
  protected jsonApiType = '';
}
