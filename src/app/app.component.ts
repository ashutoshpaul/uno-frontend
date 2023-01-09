import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubSink } from 'subsink';
import { sliderTrigger } from './core/animations/router.animations';
import { WebsocketService } from './core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sliderTrigger,
  ],
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _websocketService: WebsocketService,
  ) { }

  ngOnInit(): void { }
  
  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  /** 
   * * Invoked on tab-close and tab-refresh.
   */
  @HostListener('window:beforeunload')
  private _pageUnloaded() {
    this._websocketService.triggerPlayerAbortedEvent();
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
