import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./presentation/pages/acc/acc.page").then(p => p.AccPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import("./presentation/pages/home/home.page").then(p => p.HomePage)
      },
      {
        path: 'device-activity',
        pathMatch: 'full',
        loadComponent: () => import("./presentation/pages/device-activity/device-activity.page").then(p => p.DeviceActivityPage)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccRoutingModule { }
