import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatusMessageService } from 'src/app/services/statusMessage/statusMessage.service';

@Component({
  selector: 'app-statusMessage',
  templateUrl: './statusMessage.component.html',
  styleUrls: ['./statusMessage.component.scss']
})
export class StatusMessageComponent implements OnInit, OnDestroy {

  constructor(
    public statusMessageService: StatusMessageService,
  ) { }

  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
