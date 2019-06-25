import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base';
import { Observable } from 'rxjs';
import { UserBuilder } from './user-builder';
declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends BaseService {
  constructor(
    http: HttpClient
  ) {
    super(http);
  }
  setUrl = (url: string) => this.url = url;
  getAll = (): Observable<any> => this.getAllAction();
  get = (id: number): Observable<any> => this.getAction(id);
  post = (data: any): Observable<any> => this.postAction(data);
  put = (data: any): Observable<any> => this.putAction(data);
  delete = (id: number): Observable<any> => this.deleteAction(id);
  builderClass = () => UserBuilder;
  model = () => require(`src/app/models/${this.url}`).default;
}
