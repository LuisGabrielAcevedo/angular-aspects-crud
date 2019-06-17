import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  getAll(): Observable<any> {
    this.url = 'users';
    return this.get();
  }
}
