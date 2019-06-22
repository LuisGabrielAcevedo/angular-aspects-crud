import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';
import { QueryParamsGuard } from './guards/query-params.guard';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: ':resource',
    component: IndexComponent,
    canActivate: [QueryParamsGuard]
  },
  {
    path: ':resource/new',
    component: NewComponent,
    canActivate: [QueryParamsGuard]
  },
  {
    path: ':resource/:id',
    component: ShowComponent,
    canActivate: [QueryParamsGuard]
  },
  {
    path: ':resource/:id/edit',
    component: EditComponent,
    canActivate: [QueryParamsGuard]
  },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
