import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './configurations/http.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BootstrapFormModule } from 'src/app/components/shared-components/bootstrap-form/bootstrap-form.module';
import { MaterialFormModule } from 'src/app/components/shared-components/material-form/material-form.module';
import { IndexModule } from './components/index/index.module';
import { NewModule } from './components/new/new.module';
import { EditModule } from './components/edit/edit.module';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource.service';
import { ShowModule } from './components/show/show.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialFormModule,
    BootstrapFormModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    IndexModule,
    NewModule,
    EditModule,
    ShowModule,
    // Material
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [
    ResourceService,
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
