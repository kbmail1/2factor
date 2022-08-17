import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginState: boolean = false
  loginSubscription: Subscription
  helloResponse: String|null = null

  constructor(
    public loginService: LoginService,
    public restService: RestService,
    public router: Router,
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

  handleHello(): void {
    this.restService.hello().subscribe((data) => {
      this.helloResponse = JSON.stringify(data)
      console.log(`HeaderComponent: hello: ${this.helloResponse}`)

      // this.router.navigate(['/hello/665'], { queryParams: { 'hello-api-response': this.helloResponse } });
      // this.router.navigate(['/hello'], { queryParams: { 'hello-api-response': this.helloResponse } });
    })
  }

  handleLogin(): void {

  }

}
