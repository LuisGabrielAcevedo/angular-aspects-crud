import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFormModule } from './components/material-form/material-form.module';
import { BootstrapFormModule } from './components/bootstrap-form/bootstrap-form.module';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenInterceptor } from './configurations/http.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersFormComponent } from './components/users-form/users-form.component';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialFormModule,
    BootstrapFormModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    // Material
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    TodoService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    UsersFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
