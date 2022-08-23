import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login/login.service'
import { Subscription } from 'rxjs';
import { RestClientService } from 'src/app/services/rest-client/rest-client.service';
import { Router } from '@angular/router';
import { StatusMessageService } from 'src/app/services/statusMessage/statusMessage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginState: boolean = false
  loginSubscription: Subscription

  statusMessage: string | null = ''
  statusMessageSubscription: Subscription

  helloResponse: String | null = null

  constructor(
    public loginService: LoginService,
    public restClientService: RestClientService,
    public statusMessageService: StatusMessageService,
    public router: Router,
  ) {
    this.loginSubscription = this.loginService.loginStatus$.subscribe((status) => {
      this.loginState = status
      console.log('header: status:', status)
    })
    this.statusMessageSubscription = this.statusMessageService.statusMessage$.subscribe((msg) => {
      this.statusMessage = msg
      console.log('header: error:', this.statusMessage)
    })
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe()
    this.statusMessageSubscription.unsubscribe()
  }

  handleHello(): void {
    this.restClientService.hello().subscribe((data) => {
      this.helloResponse = JSON.stringify(data)
      console.log(`HeaderComponent: hello: ${this.helloResponse}`)

      // this.router.navigate(['/hello/665'], { queryParams: { 'hello-api-response': this.helloResponse } });
      // this.router.navigate(['/hello'], { queryParams: { 'hello-api-response': this.helloResponse } });
    })
  }
}
