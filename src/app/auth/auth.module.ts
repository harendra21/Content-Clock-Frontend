import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from  '@angular/forms';
import { AntModule } from '../ant.module';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    SuccessComponent,
    FailureComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AntModule
  ]
})
export class AuthModule { }
