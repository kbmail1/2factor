import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  helloResponse: any

  constructor(
    public rest: RestService,
    private router: Router
  ) {
    this.helloResponse = {}
  }

  ngOnInit(): void {
  }

  handleHello(): void {
    this.rest.hello().subscribe((data: {}) => {
      this.helloResponse = JSON.stringify(data)
      console.log(`Home.Component: hello response: ${this.helloResponse}`)

      this.router.navigate(['/api/hello/3'])
    })
  }

}
