import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginFailed = false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginFailed = false;
    const loginInfo = new FormData();
    loginInfo.append('Username', this.loginForm.controls.username.value);
    loginInfo.append('Password', this.loginForm.controls.password.value);
    this.loginService.login(loginInfo)
      .pipe(take(1))
      .subscribe(res => {
      },
        error => {
          this.loginFailed = true;
        });
  }

}
