import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'name',
  },
  {
    path: 'name',
    loadComponent: () =>
      import('./sign-up-name/sign-up-name.page').then((p) => p.SignUpNamePage),
  },
  {
    path: 'birthdaygender',
    loadComponent: () =>
      import('./sign-up-birthday-gender/sign-up-birthday-gender.page').then(
        (p) => p.SignUpBirthdayGenderPage,
      ),
  },
  {
    path: 'username',
    loadComponent: () =>
      import('./sign-up-username/sign-up-username.page').then(
        (p) => p.SignUpUsernamePage,
      ),
  },
  {
    path: 'password',
    loadComponent: () =>
      import('./sign-up-password/sign-up-password.page').then(
        (p) => p.SignUpPasswordPage,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
