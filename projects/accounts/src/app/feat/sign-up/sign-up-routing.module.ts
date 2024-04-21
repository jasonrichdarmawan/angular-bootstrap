import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'name'
  },
  {
    path: 'name',
    loadComponent: () => import("./presentation/pages/name/name.page").then(p => p.NamePage),
  },
  {
    path: 'birthday-gender',
    loadComponent: () => import("./presentation/pages/birthday-gender/birthday-gender.page").then(p => p.BirthdayGenderPage)
  },
  {
    path: 'username',
    loadComponent: () => import("./presentation/pages/username/username.page").then(p => p.UsernamePage)
  },
  {
    path: 'password',
    loadComponent: () => import("./presentation/pages/password/password.page").then(p => p.PasswordPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
