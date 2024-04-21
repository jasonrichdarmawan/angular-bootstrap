import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/layout/home/home.layout').then(
        (p) => p.HomeLayout,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./presentation/pages/home/home.page').then((p) => p.HomePage),
      },
      {
        path: 'security',
        loadComponent: () =>
          import('./presentation/pages/security/security.page').then(
            (p) => p.SecurityPage,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccRoutingModule {}
