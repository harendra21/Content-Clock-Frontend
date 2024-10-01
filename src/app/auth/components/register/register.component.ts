import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../service/custom-validation.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public loginForm: FormGroup;
  public submitted = false;
  public apiHost = environment.v1Api
  public logo = environment.config.logo128

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private router: Router,
    private alert: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],

    }
    );
  }


  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value

      // sign up => this.api.account().create(ID.unique(), "ahcsab@", 'acsay')

      // this.api.account().createEmailSession(
      //   formData.email,
      //   formData.password
      // ).then((resp: any) => {
      //   this.router.navigate(['/home']);
      //   this.alert.showAlert("Logged in", "success")
      // }, err => {
      //   this.alert.showAlert(err.message)
      // })


    } else {
      this.alert.showAlert("Error in login")
    }
  }


}
