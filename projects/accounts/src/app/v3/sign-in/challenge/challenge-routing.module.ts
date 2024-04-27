import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pwd',
  },
  {
    path: 'pwd',
    loadComponent: () =>
      import('./challenge-pwd/challenge-pwd.page').then(
        (p) => p.ChallengePwdPage,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
