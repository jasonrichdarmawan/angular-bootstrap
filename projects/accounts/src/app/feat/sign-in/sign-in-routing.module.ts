import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'identifier',
  },
  {
    path: 'identifier',
    loadComponent: () =>
      import('./presentation/pages/identifier/identifier.page').then(
        (p) => p.IdentifierPage,
      ),
  },
  {
    path: 'challenge',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pwd',
      },
      {
        path: 'pwd',
        loadComponent: () =>
          import('./presentation/pages/challenge-pwd/challenge-pwd.page').then(
            (p) => p.ChallengePwdPage,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
