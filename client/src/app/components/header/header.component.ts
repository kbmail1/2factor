import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginState: boolean = false
  loginSubscription: Subscription

  constructor(
    public loginService: LoginService
  ) {
    this.loginSubscription = this.loginService.loginStatus$.subscribe((status) => {
      this.loginState = status
      console.log('header: status:', status)
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe()
  }
}
