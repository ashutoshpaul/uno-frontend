import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sliderTrigger } from './core/animations/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sliderTrigger,
  ],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
