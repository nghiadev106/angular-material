import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  //localhost:4200
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //localhost:4200/login
  { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  //localhost:4200/admin
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
