import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./feat/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'device-activity',
    loadChildren: () =>
      import('./feat/device-activity/device-activity.module').then(
        (m) => m.DeviceActivityModule,
      ),
  },
];
