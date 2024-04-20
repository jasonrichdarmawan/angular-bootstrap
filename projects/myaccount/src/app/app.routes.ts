import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./feat/my-acc/my-acc.module").then(m => m.MyAccModule)
  }
];
