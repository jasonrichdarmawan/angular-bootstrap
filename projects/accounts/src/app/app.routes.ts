import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./feat/acc/acc.module").then(m => m.AccModule)
  }
];
