import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { RestClientService } from '../../services/rest-client/rest-client.service';


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
    public restClientService: RestClientService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('login.component:onSubmit...')
    console.log('login.component: ', this.loginForm.value)
    this.loginService.login(this.loginForm.value.userId, this.loginForm.value.password)
  }

  onRegister(event: any) {
    event.preventDefault()
    console.log(typeof event)
    console.log('login.component:onRegister...')
    console.log('login.component: onRegister', this.loginForm.value)
    this.loginService.register(this.loginForm.value.userId, this.loginForm.value.password)
  }
}
