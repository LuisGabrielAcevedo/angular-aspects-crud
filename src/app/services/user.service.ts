import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.url = 'users';
  }

  getAll = (): Observable<any> => this.get();
}
