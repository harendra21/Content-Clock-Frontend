import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "register",
    component: RegisterComponent
  },

  {
    path: "success",
    component: SuccessComponent
  }, {
    path: "failure",
    component: FailureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
