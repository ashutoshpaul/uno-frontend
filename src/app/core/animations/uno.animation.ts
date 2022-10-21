import { 
  trigger, transition, animate, style, state, sequence
} from '@angular/animations';

export const unoTrigger = trigger('uno', [
  state('trigger', style({ opacity: '0' }),),
  transition('* => trigger', [
    style({ opacity: "0" }),
    animate('0.4s ease-in-out', style({ opacity: "1" })),
    animate('0.3s ease-in-out', style({ opacity: "0.2" })),
    animate('0.3s ease-in-out', style({ opacity: "1" })),
    animate('0.4s ease-in-out', style({ opacity: "0" })),
  ]),
]);