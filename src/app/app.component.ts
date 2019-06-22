import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') sidebar: MatDrawer;
  drawerContent: DrawerContent[] = [
    {
      label: 'Users',
      icon: 'fa-users',
      route: 'users'
    },
    {
      label: 'Countries',
      icon: 'fa-globe-americas',
      route: 'countries'
    }
  ];
  title = 'angular 8';
  constructor(
    public loadingService: LoadingService,
  ) {
  }
}

interface DrawerContent {
    icon: string;
    label: string;
    route: string;
}
