import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenInterceptor } from './configurations/http.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BootstrapFormModule } from 'src/app/components/shared-components/bootstrap-form/bootstrap-form.module';
import { MaterialFormModule } from 'src/app/components/shared-components/material-form/material-form.module';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { IndexModule } from './components/index/index.module';


@NgModule({
  declarations: [
    AppComponent
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
    IndexModule,
    // Material
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
