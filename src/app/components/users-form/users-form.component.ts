import { Component, OnInit, Inject } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { IFormField } from '../material-form/material-form.interfaces';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  userConfig: IFormField[] = [];
  edit = false;
  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userConfig = this.userService.model();
    if (this.data) {
      this.userConfig = this.userConfig.map(field => {
      if (field.key === 'id') {
        if(field.key) this.edit = true;
      }
      return { ...field , value: this.data[field.key]};  
      });
    }
  }

  formSubmitted(user: IUser) {
    this.dialogRef.close(user);
  }
}
