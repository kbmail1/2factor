import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../../services/rest-client/rest-client.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginState: boolean = false
  loginSubscription: Subscription

  helloResponse: any

  constructor(
    public restClientService: RestClientService,
    private router: Router,
    public loginService: LoginService,

  ) {

    this.loginSubscription = this.loginService.loginStatus$.subscribe((state) => {
      this.loginState = state
    })

    this.helloResponse = {}
  }

  ngOnInit(): void {
  }

  handleHello(): void {
    this.restClientService.hello().subscribe((data) => {
      this.helloResponse = JSON.stringify(data)
      console.log(`HomeComponent: hello: ${this.helloResponse}`)

      // * THIS IS IMPORTANT - DO NOT DELETE
      // this.router.navigate(['/hello/665'], { queryParams: { 'hello-api-response': this.helloResponse } });
      // this.router.navigate(['/hello'], { queryParams: { 'hello-api-response': this.helloResponse } });
    })
  }

}
