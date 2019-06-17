import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EFormType } from '../components/bootstrap-form/bootstrap-form.interfaces';
import { IFormField } from '../components/material-form/material-form.interfaces';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  constructor(private http: HttpClient) {
    this.url = 'https://api-crud-test.herokuapp.com/users';
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post(this.url, user);
  }

  updateUser(user: IUser) {
    return this.http.put(`${this.url}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  model(): IFormField[] {
    return [
      {
        type: EFormType.input,
        key: 'id',
        label: 'Id',
        value: '',
        placeholder: 'Id',
        inputType: 'text'
      },
      {
        type: EFormType.input,
        key: 'first_name',
        label: 'First name',
        value: '',
        placeholder: 'Fisrt name',
        inputType: 'text'
      },
      {
        type: EFormType.input,
        key: 'last_name',
        label: 'Last name',
        value: '',
        placeholder: 'Last name',
        inputType: 'text'
      },
      {
        type: EFormType.input,
        key: 'email',
        label: 'Email',
        value: '',
        placeholder: 'Email',
        inputType: 'email'
      }
    ]
  }
}
