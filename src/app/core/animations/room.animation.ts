import { 
  trigger, transition, animate, style, query, stagger, keyframes
} from '@angular/animations';

export const playerRoomTrigger = trigger('playerRoom', [
  transition(':enter', [  // on refresh
    query('div', [
      style({
        opacity: "0",
        transform: "translateY(-1rem)",
      }),
      stagger(190, animate('0.5s ease-in-out', keyframes([
        style({ 
          display: "flex",
          opacity: "0.5",
        }),
        style({
          opacity: "1",
          transform: "translateY(0rem)",
        }),
      ])),),
    ], { optional: true }),
  ]),
  transition('* <=> *', [
    query(':enter', [
      query('div', [
        style({
          opacity: "0",
          transform: "translateY(-1rem)",
        }),
        stagger(190, animate('0.5s ease-in-out', keyframes([
          style({ 
            display: "flex",
            opacity: "0.5",
          }),
          style({
            opacity: "1",
            transform: "translateY(0rem)",
          }),
        ])),),
      ], { optional: true }),
    ], { optional: true }),
    query(':leave', [
      query('div', [
        animate('0.5s ease-in-out', keyframes([
          style({
            opacity: "0.5",
          }),
          style({
            opacity: "0",
          }),
        ])),
      ], { optional: true }),
    ], { optional: true }),
  ]),
]);