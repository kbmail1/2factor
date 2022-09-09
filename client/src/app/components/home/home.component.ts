import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../../services/rest-client/rest-client.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginState: boolean = false
  sessionSubscription: Subscription

  helloResponse: any

  constructor(
    public restClientService: RestClientService,
    private router: Router,
    public loginService: LoginService,
    public sessionService: SessionService,

  ) {
    this.sessionSubscription = this.sessionService.state$.subscribe((state) => {
      this.loginState = this.loginService.isItLoginState(state)
      console.log('home.component: login state:', state)
    })

    this.helloResponse = {}
  }

  ngOnInit(): void {
  }
}
