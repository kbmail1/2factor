import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusMessageService } from './services/statusMessage/statusMessage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  statusMessage: string  = ''
  statusMessageSubscription: Subscription

  constructor(
    statusMessageService: StatusMessageService,
  ) {

    this.statusMessageSubscription = statusMessageService.statusMessage$.subscribe((msg) => {
      msg ? this.statusMessage = msg : this.statusMessage = ''

      console.log('app.component.ts: ', this.statusMessage)
    })
  }
}
