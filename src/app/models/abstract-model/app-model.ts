import { Model } from "../../axioquent/model";

export class AppModel extends Model {
    getBaseUrl(): string {
        return 'https://api-crud-test.herokuapp.com';
    }
}