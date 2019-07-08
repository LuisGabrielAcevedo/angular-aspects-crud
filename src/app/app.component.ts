import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { LoadingService } from 'src/app/services/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') sidebar: MatDrawer;
  drawerContent: DrawerContent[] = [
    {
      label: 'users',
      icon: 'fa-users',
      route: 'users'
    },
    {
      label: 'countries',
      icon: 'fa-globe-americas',
      route: 'countries'
    },
    {
      label: 'states',
      icon: 'fa-flag-usa',
      route: 'states'
    }
  ];
  title = 'angular 8';
  constructor(
    public loadingService: LoadingService,
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('en');
  }
}

interface DrawerContent {
    icon: string;
    label: string;
    route: string;
}
