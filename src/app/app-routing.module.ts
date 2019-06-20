import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: IndexComponent
  },
  {
    path: 'users/new',
    component: NewComponent
  },
  {
    path: 'users/:id',
    component: EditComponent
  },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
