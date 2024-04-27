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
      import('./sign-in-identifier/sign-in-identifier.page').then(
        (p) => p.SignInIdentifierPage,
      ),
  },
  {
    path: 'challenge',
    loadChildren: () =>
      import('./challenge/challenge.module').then((m) => m.ChallengeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
