import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loginService: LoginService,
    public restService: RestService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('login.component.ts:onSubmit...')
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value.userId, this.loginForm.value.password)
    console.log('login.component: invoked loginService.login(): If success, loginStatus$ must have changed...')
  }
}
