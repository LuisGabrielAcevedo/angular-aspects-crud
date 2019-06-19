import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Builder } from './builder';

export abstract class BaseService {
  url: string;
  constructor(
    private http: HttpClient
  ) {}

  get = (): Observable<object> => this.http.get(this.url);

  getAspectsFromAPI = (): Observable<object> => this.http.get(this.url + '/aspects');
  
  builderClass = () => Builder;

  builder() {
    const builderClass = this.builderClass();
    return new builderClass(this);
  }
  
  aspects(){
    this.builder().aspects();
  }

}
