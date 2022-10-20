import { 
  trigger, group, transition, animate, style, query, state, keyframes
} from '@angular/animations';

export const buttonAppearTrigger = trigger('buttonAppear', [
  state('false', style({ display: "none", transform: "scale(0)" })),
  state('true', style({ display: "flex", transform: "scale(1)" })),
  transition('0 => 1', [
    style({ display: "flex", transform: "scale(0)" }),
    animate('0.2s ease-in-out', style({ transform: "scale(1.4)" })),
    animate('0.1s ease-in-out', style({ transform: "scale(1)" })),
  ]),
  transition('1 => 0', [
    animate('0.1s ease-in-out', style({ transform: "scale(1.4)" })),
    animate('0.2s ease-in-out', style({ transform: "scale(0)" })),
  ]),
]);

export const chosenColorAlertTrigger = trigger('chosenColorAlert', [
  state('true', style({})),
  state('false', style({})),
  state('stop', style({})),
  state('loaded', style({})),
  transition('0 <=> 1', [
    group([
    query(':nth-child(1)',
      animate('0.3s ease-in-out', keyframes([
      style({ transform: "scale(1)" }),
      style({ transform: "scale(1.5)" }),
      style({ transform: "scale(1)" }),
      ])),
    ),
    query(':nth-child(2)',
      animate('0.3s 0.3s ease-in-out', keyframes([
      style({ transform: "scale(1)" }),
      style({ transform: "scale(1.5)" }),
      style({ transform: "scale(1)" }),
      ])),
    ),
    query(':nth-child(3)',
      animate('0.3s 0.6s ease-in-out', keyframes([
      style({ transform: "scale(1)" }),
      style({ transform: "scale(1.5)" }),
      style({ transform: "scale(1)" }),
      ])),
    ),
    query(':nth-child(4)',
      animate('0.3s 0.9s ease-in-out', keyframes([
      style({ transform: "scale(1)" }),
      style({ transform: "scale(1.5)" }),
      style({ transform: "scale(1)" }),
      ])),
    ),
    ]),
  ]),
  transition('loaded => 1', [
    query('section', style({ transform: "scale(1)" })),
    query('section',
    animate('0.4s 0.4s ease-in-out', style({ transform: "scale(1)" })),
    ),
  ]),
  transition('* => stop', [
    query('section',
    animate('0.3s ease-in-out', style({ transform: "scale(1)" })),
    ),
  ]),
]);

export const enterButtonTrigger = trigger('enterButton', [
  transition('void => *', [
    style({ transform: "scale(0)", opacity: "0" }),
    animate('0.5s 0.2s ease-in-out', keyframes([
    style({ transform: "scale(0)", opacity: "0" }),
    style({ transform: "scale(3.5)", opacity: "1" }),
    style({ transform: "scale(2)", opacity: "1" }),
    ])),
  ]),
]);

export const unoButtonSlideTrigger = trigger('unoButtonSlide', [
  state('stationary', style({})),
  state('slide', style({ right: "9rem" })),
  transition('stationary => slide', [
    animate('0.2s ease-in-out', style({ right: "9rem" })),
  ]),
]);