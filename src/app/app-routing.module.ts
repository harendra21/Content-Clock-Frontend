import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'admin/dashboard', pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'connections',
    loadChildren: () => import('./connections/connections.module').then(mod => mod.ConnectionsModule),
    canActivate: [AuthService]
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./scheduler/scheduler.module').then(mod => mod.SchedulerModule),
    canActivate: [AuthService]
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(mod => mod.PostModule),
    canActivate: [AuthService]
  },
  {
    path: 'admin/dashboard',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    onSameUrlNavigation: 'reload',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
