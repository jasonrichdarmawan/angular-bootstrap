import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'v3',
  },
  {
    path: 'v3',
    loadChildren: () => import('./v3/v3.module').then((m) => m.V3Module),
  },
  {
    path: 'lifecycle',
    loadChildren: () =>
      import('./lifecycle/lifecycle.module').then((m) => m.LifecycleModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@common/not-found/not-found.page').then((p) => p.NotFoundPage),
  },
];
