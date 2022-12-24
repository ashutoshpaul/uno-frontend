import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTIFICATION_EVENT } from 'src/app/core/enums/notification.enum';
import { IGameNotification } from 'src/app/core/interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() notification$: Observable<IGameNotification>;

  public readonly events: typeof NOTIFICATION_EVENT = NOTIFICATION_EVENT;

  constructor() { }

}
