import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    loadChildren: () => import("./feat/sign-in/sign-in.module").then(m => m.SignInModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import("./feat/sign-up/sign-up.module").then(m => m.SignUpModule)
  }
];
