import { Component } from '@angular/core';
import { ID } from "appwrite"
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../../service/custom-validation.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm: FormGroup;
  submitted = false
  public errorString = ""

  constructor(
    private route: Router,
    private customValidator: CustomvalidationService,
    private formG: FormBuilder,
    private alert: AlertService
  ) {

    this.registerForm = this.formG.group({
      name: ['Harendra', Validators.required],
      email: ['harendra@gmail.com', [Validators.required, Validators.email]],
      password: ['Harendra@1234', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['Harendra@1234', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.errorString = ""
    const formData = this.registerForm.value
    var email = formData.email || ""
    var password = formData.password || ""
    var name = formData.name || ""
    if (this.registerForm.valid) {
      this.submitted = true;
      // this.api.account().create(ID.unique(), email, password, name).then((res) => {
      //   this.route.navigate(["/admin/auth/login"])
      // }, err => {
      //   this.submitted = false;
      //   this.alert.showAlert(err.message);
      //   this.errorString = err.message
      // })
    }
  }

}
