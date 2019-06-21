import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Builder } from './builder';

export abstract class BaseService {
  url: string;
  protected constructor(
    private http: HttpClient
  ) {}

  get = (): Observable<object> => this.http.get(this.url);

  getAspectsFromAPI = (): Observable<object> => this.http.get(this.url + '/aspects');

  builderClass = () => Builder;

  builder(): Promise<Builder> {
    const builderClass = this.builderClass();
    const builder = new builderClass(this);
    return builder.initializationPromise;
  }

}
