import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login/login.service'
import { Subscription } from 'rxjs';
import { RestClientService } from 'src/app/services/rest-client/rest-client.service';

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
  loginSubscription: Subscription

  constructor(
    private _activatedRoute: ActivatedRoute,
    public loginService: LoginService,
  ) {
    this.helloResponse = {}

    this.loginSubscription = this.loginService.loginStatus$.subscribe((status) => {
      this.loginState = status
      console.log('hello: status:', status)
    })
  }

  ngOnInit(): void {

    this._activatedRoute.params
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        console.log(typeof params)
        console.log(params['id']); // "popular"
      })

    console.log('HelloComponent: queryParams...')
    this._activatedRoute.queryParams
      .subscribe((params) => {
        console.log(params)
      });

  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe()
  }
}
