import { 
  animation, trigger, group, transition, animate, style, query, stagger, state, sequence
} from '@angular/animations';

export const revealCardsTrigger = trigger('revealCards', [
  transition(':enter', [
    query('div > .uno-card-container', [
    style({ transform: "rotateY(180deg)" }),
    stagger(
      190, animate('1s 1000ms ease-in-out', 
      style({ transform: "rotateY(0deg)" }))
    ),
    ], { optional: true }), // { limit: 7 }
  ]),
]);

export const cardActivityTrigger = trigger('cardActivity', [
  state('secret', style({}), 
    { params: { xOriginPosition: 0, yOriginPosition: 0 }}
  ),
  state('stationary', style({
    top: "0px",
    left: "0px",
    right: "0px",
  })),
  state('prompt', style({
    top: "-0.9rem",
    minWidth: "5rem",
  })),
  state('peep', style({
    boxShadow: "black 2px 2px 4px",
    top: "-1.5rem",
    minWidth: "5rem",
    right: "0px",
  })),
  state('discard', style({
    top: "{{yDiscardPosition}}px",
    right: "{{xDiscardPosition}}px",
    minWidth: "5rem",
    display: "none",
  }), {
    params: { xDiscardPosition: 0, yDiscardPosition: 0 },
  }),
  transition('void => stationary', [
    query('.uno-card-container', [
    sequence([
      style({
        top: "{{yOriginPosition}}px",
        left: "{{xOriginPosition}}px",
        transform: "rotateY(180deg)",
        width: "5rem",
        pointerEvents: "none",
        visibility: "hidden"
      }),
      animate('0.2s', style({ visibility: "visible" })),
      animate('0.7s ease-in-out', 
      style({ top: "0rem", left: "0rem", right: "0rem" })
      ),
      animate('1s ease-in-out', 
      style({ 
        transform: "rotateY(0deg)",
        pointerEvents: "unset"
      })),
    ]),
    ], { optional: true, limit: -1 }),
  ]),
  transition('stationary <=> prompt', [
    animate('0.1s ease-in-out'),
  ]),
  transition('stationary <=> peep', [
    animate('0.2s ease-in-out'),
  ]),
  transition('prompt <=> peep', [
    animate('0.1s ease-in-out'),
  ]),
  transition('peep => discard', [
    animate('0.7s ease-in-out'),
  ]),
]);

export const drawerDeckCardActivityTrigger = trigger('drawerDeckCardActivity', [
  state('false', 
    style({
      top: "0px",
      left: "0px",
      width: "5rem",
      visibility: "hidden",
    }),
  ),
  state('true', style({
    width: "5rem",
  }), {
    params: {
      // yDiscardPosition will not change
      xDiscardPosition: 0 
    }, 
  }),
  transition('0 => 1', [
    query('.uno-card-container', [
      sequence([
        style({
          top: "0px",
          left: "0px",
          width: "5rem",
          transform: "rotateY(180deg)",
          visibility: "visible",
          pointerEvents: "none",
          cursor: "unset",
        }),
        group([
          animate('0.7s 0.8s ease-in', style({
            transform: "rotateY(0deg)",
            pointerEvents: "unset"
          })),
          animate('1s 0.5s ease-in-out', style({
            left: "{{xDiscardPosition}}px"
          })),
        ]),
      ]),
      animate('0s 0.5s', style({})),
      ], { optional: true }),
  ]),
]);