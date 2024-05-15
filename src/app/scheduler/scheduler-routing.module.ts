import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: "add", component: AddComponent
  },
  {
    path: "view", component: ViewComponent
  },
  {
    path: "preview/:id", component: PreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
