import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ScheduledComponent } from './scheduled/scheduled.component';

const routes: Routes = [
  { path: 'scheduled/:id/', component: ScheduledComponent },
  { path: 'create/:id', component: CreateComponent },
  // { path: 'create/:id/:action', component: CreateComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
