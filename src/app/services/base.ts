import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Builder } from './builder';

export abstract class BaseService {
  url: string;
  protected constructor(
    private http: HttpClient
  ) {}

  getAllAction = (): Observable<object> => this.http.get(this.url);

  getAction = (id: number): Observable<object> => this.http.get(this.url + `/${id}`);

  postAction = (data: any): Observable<any> => this.http.post(this.url, data);

  putAction = (data: any): Observable<any> => this.http.put(this.url + `/${data.id}`, data);

  getAspectsFromAPI = (): Observable<object> => this.http.get(this.url + '/aspects');

  builderClass = () => Builder;

  builder(): Promise<Builder> {
    const builderClass = this.builderClass();
    const builder = new builderClass(this);
    return builder.initializationPromise;
  }

}
