import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login/login.service'
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  providers: []
})
export class HelloComponent implements OnInit {

  helloResponse: any
  params: any


  loginState: boolean = false
  sessionSubscription: Subscription

  constructor(
    private _activatedRoute: ActivatedRoute,
    public loginService: LoginService,
    public sessionService: SessionService,
  ) {
    this.helloResponse = {}

    this.sessionSubscription = this.sessionService.state$.subscribe((state: any) => {
        this.loginState = this.loginService.isItLoginState(state)
      console.log('hello.component: login state:', state)
    })
  }

  ngOnInit(): void {

    this._activatedRoute.params
      .subscribe(params => {
        console.log(params);
        console.log(typeof params)
        console.log(params['id']);
      })

    console.log('HelloComponent: queryParams...')
    this._activatedRoute.queryParams
      .subscribe((params) => {
        console.log(params)
      });
  }

  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe()
  }
}
