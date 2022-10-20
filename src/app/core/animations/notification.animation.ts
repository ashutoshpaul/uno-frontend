import { 
  trigger, transition, animate, style, state, sequence
} from '@angular/animations';


export const messageNotificationTrigger = trigger('messageNotification', [
  state('trigger', style({ display: "none" })),
  transition('* => trigger', [
    style({ right: "-8rem" }),
    sequence([
      animate('0.5s ease-in-out', style({ right: "1rem" })),
      animate('0.2s 0.2s ease-in-out', style({ opacity: "0.2" })), // blink three times
      animate('0.2s ease-in-out', style({ opacity: "1" })),
      animate('0.2s ease-in-out', style({ opacity: "0.2" })),
      animate('0.2s ease-in-out', style({ opacity: "1" })),
      animate('0.2s ease-in-out', style({ opacity: "0.2" })),
      animate('0.2s ease-in-out', style({ opacity: "1" })),
    ]),
    animate('0.5s 0.2s ease-in-out', style({ right: "-8rem" })),
  ]),
]);

export const gameNotificationTrigger = trigger('gameNotification', [
  state('trigger', style({ display: "none" })),
  transition('* => trigger', [
    style({ top: "-10rem", display: "unset" }),
    animate('0.5s ease-in-out', style({ top: "1rem" })),
    animate('0.5s 1.5s ease-in-out', style({ top: "-10rem", display: "none" })),
  ]),
]);