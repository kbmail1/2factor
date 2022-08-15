import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  helloResponse: any
  params: any

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this.helloResponse = {}
  }

  ngOnInit(): void {
    console.log('hello.component: ')
    this._activatedRoute.params
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        console.log(typeof params)
        console.log(params['id']); // "popular"
      })

    console.log('queryParams\n')
    this._activatedRoute.queryParams
      .subscribe((params) => {
        console.log(params)
      });
  }
}
