import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Builder } from './builder';

interface BaseInterface {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService implements BaseInterface {
  url;
  constructor(
    private http: HttpClient
  ) {}

  get(): Observable<any> {
    return this.http.get(this.url);
  }

  builder() {
    const builderClass = this.builderClass();
    // const builderInstance = new builderClass(this);
    // builderInstance.buildAspects();
    // return builderInstance;
    return new builderClass(this);
  }

  builderClass() {
    return Builder;
  }

  getAspectsFromAPI() : Observable<any>{
    this.url = 'users';
    return this.http.get(`${this.url}/aspects`);
  }
}
