import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from  '@angular/forms';
import { AntModule } from '../ant.module';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';

@NgModule({
  declarations: [
    LoginComponent,
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
