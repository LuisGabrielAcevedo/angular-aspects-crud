import { Injectable } from '@angular/core';
import { IFormField, EFormType } from 'src/app/components/material-form/material-form.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {}

  editTodo() : IFormField[] {
    return [
      {
        type: EFormType.input,
        key: 'first_name',
        label: 'First name',
        value: '',
        placeholder: 'Write your fisrt name',
        inputType: 'text'
      },
      {
        type: EFormType.input,
        key: 'last_name',
        label: 'Last name',
        value: '',
        placeholder: 'Write your last name',
        inputType: 'text'
      },
      {
        type: EFormType.input,
        key: 'email',
        label: 'Email',
        value: '',
        placeholder: 'Write your email',
        inputType: 'email'
      },
      {
        type: EFormType.input,
        key: 'password',
        label: 'Password',
        value: '',
        placeholder: 'Write your password',
        inputType: 'password'
      },
      {
        type: EFormType.autocomplete,
        key: 'company',
        label: 'Company',
        value: '',
        placeholder: 'Select a company'
      },
      {
        type: EFormType.checkbox,
        key: 'is_active',
        label: 'Active',
        value: true
      },
      {
        type: EFormType.datepicker,
        key: 'age',
        label: 'Age',
        value: '',
        placeholder: 'Select your age'
      },
      {
        type: EFormType.radioButton,
        key: 'type',
        label: 'Type',
        value: ''
      },
      {
        type: EFormType.select,
        key: 'application',
        label: 'Application',
        value: '',
        placeholder: 'Select a application'
      },
      {
        type: EFormType.slider,
        key: 'calification',
        label: 'Calification',
        value: '',
        placeholder: 'Select a calification'
      }
    ]
  }
}
