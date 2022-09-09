import { SessionService } from 'src/app/shared/session.service';
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

  sessionSubscription: Subscription

  statusMessage: string | null = ''
  statusMessageSubscription: Subscription

  helloResponse: String | null = null

  constructor(
    public loginService: LoginService,
    public restClientService: RestClientService,
    public statusMessageService: StatusMessageService,
    public sessionService: SessionService,
    public router: Router,
  ) {

    this.sessionSubscription = this.sessionService.state$.subscribe((state: any) => {
        this.loginState = this.loginService.isItLoginState(state)
        console.log('header.component in subscription: state:', state)
        console.log('header.component in subscription: loginState:', this.loginState)
    })

    this.statusMessageSubscription = this.statusMessageService.statusMessage$.subscribe((msg) => {
      this.statusMessage = msg

      console.log('header: ', this.statusMessage)
    })
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.statusMessageSubscription.unsubscribe()
  }

  handleHello(): void {
    this.restClientService.hello().subscribe((data) => {
      this.helloResponse = JSON.stringify(data)
      console.log(`HeaderComponent: hello: ${this.helloResponse}`)

      // This is important - do not delete (for reference)
      // this.router.navigate(['/hello/665'], { queryParams: { 'hello-api-response': this.helloResponse } });
      // this.router.navigate(['/hello'], { queryParams: { 'hello-api-response': this.helloResponse } });
    })
  }
}
