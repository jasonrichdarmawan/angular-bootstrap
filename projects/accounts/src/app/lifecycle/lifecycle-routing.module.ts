import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'steps',
  },
  {
    path: 'steps',
    loadChildren: () =>
      import('./steps/steps.module').then((m) => m.StepsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifecycleRoutingModule {}
