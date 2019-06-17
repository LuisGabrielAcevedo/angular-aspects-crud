import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from 'src/app/components/users-form/users-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'edit', 'delete'];
  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users);
  }

  userDialog(user: IUser) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '300px',
      height: '350px',
      data: user ? user : null,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((resp: IUser) => {
      if (resp) {
        !resp.id 
        ? this.userService.addUser(resp).subscribe(() => this.loadUsers())
        : this.userService.updateUser(resp).subscribe(() => this.loadUsers());
      }
    });
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
  }
}