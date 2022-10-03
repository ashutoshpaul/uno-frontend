import { 
  trigger, group, transition, animate, style, query, stagger, state, sequence, keyframes
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
  state('secret', style({}), // card is present in drawer deck
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
          height: "6rem",
          width: "4.2rem",
          transform: "rotateY(180deg)",
          pointerEvents: "none",
          visibility: "hidden"
        }),
        animate('0.2s', style({ visibility: "visible" })),
        animate('0.7s ease-in-out', keyframes([
          style({
            height: "6rem",
            width: "4.2rem",
            top: "{{yOriginPosition}}px",
            left: "{{xOriginPosition}}px",
          }),
          style({
            height: "6.5rem",
            width: "4.5rem",
            top: "calc({{yOriginPosition}}px/2)",
            left: "calc({{xOriginPosition}}px/2)",
          }),
          style({
            height: "7rem",
            width: "5rem",
            minWidth: "4.2rem",
            top: "0rem",
            left: "0rem",
            right: "0rem",
          }),
        ]),
        ),
        animate('1s ease-in-out', 
          style({ 
            transform: "rotateY(0deg)",
            pointerEvents: "unset"
          })
        ),
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
    animate('0.7s ease-in-out', keyframes([
      style({ 
        height: "7rem",
        width: "5rem",
        minWidth: "4.2rem",
      }),
      style({ 
        height: "6.5rem",
        width: "4.5rem",
        top: "calc({{yDiscardPosition}}px/2)",
        right: "calc({{xDiscardPosition}}px/2)",
      }),
      style({ 
        height: "6rem",
        width: "4.2rem",
        top: "{{yDiscardPosition}}px",
        right: "{{xDiscardPosition}}px",
      }),
    ])),
  ]),
]);

export const drawerDeckCardActivityTrigger = trigger('drawerDeckCardActivity', [
  state('false', 
    style({
      height: "6rem",
      width: "4.2rem",
      visibility: "hidden",
    }),
  ),
  state('true', style({
    height: "6rem",
    width: "4.2rem",
    visibility: "hidden"
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
          transform: "rotateY(180deg)",
          visibility: "visible",
          pointerEvents: "none",
          cursor: "unset",
          perspective: "1000px"
        }),
        group([
          animate('1s 0.5s ease-in-out', style({
            left: "{{xDiscardPosition}}px",
          })),
          animate('1s 0.5s ease-in-out', keyframes([
            style({ transform: "translateZ(0px) rotateY(180deg)", }),
            style({ transform: "translateZ(400px) rotateY(30deg)", }),
            style({ transform: "translateZ(0px) rotateY(0deg)", }),
          ])),
        ]),
      ]),
      animate('0s 0.5s', style({})),
    ], { optional: true }),
  ]),
]);

export const frontPlayerCardActivityTrigger = trigger('frontPlayerCardActivity', [
  state('stationary', style({
    top: "0px",
    left: "0px",
    height: "5.5rem", 
    width: "4rem",
    display: "unset",
  }),
  { params: { xOriginPosition: 0, yOriginPosition: 0 }}
  ),
  state('discard', style({
    top: "{{yDiscardPosition}}px",
    left: "{{xDiscardPosition}}px",
    height: "6rem", 
    width: "4.2rem",
    display: "none",
  }),  {
    params: { xDiscardPosition: 0, yDiscardPosition: 0 },
  }),
  transition('void => stationary', [
    query('.uno-card-container', [
      style({
        top: "{{yOriginPosition}}px",
        left: "{{xOriginPosition}}px",
        transform: "rotateY(180deg)",
        height: "6rem",
        width: "4.2rem",
      }),
      group([
        animate('0.7s 0.5s ease-in-out', 
          style({
            top: "0px",
            left: "0px",
            height: "5.5rem", 
            width: "4rem",
          }),
        ),
        animate('0.6s 0.5s ease-in-out', 
          style({ transform: "rotateY(180deg) rotateZ(-180deg)", })
        ),
      ]),
    ]),
  ]),
  transition('stationary => discard', [
    query('.uno-card-container', [
      style({
        top: "0px",
        left: "0px",
        height: "5.5rem",
        width: "4rem",
        transform: "rotateY(180deg) rotateZ(180deg)",
      }),
      group([
        animate('1s 0.5s ease-in-out', 
          style({
            top: "{{yDiscardPosition}}px",
            left: "{{xDiscardPosition}}px",
            height: "6rem", 
            width: "4.2rem",
          }),
        ),
        animate('1s 0.5s ease-in-out', keyframes([
          style({ transform: "rotateY(180deg) rotateZ(180deg)", }),
          style({ transform: "rotateY(240deg) rotateZ(90deg)", }),
          style({ transform: "rotateY(360deg) rotateZ(0deg)", }),
        ]),),
      ]),
      animate('0s 1s', style({ display: "none" })),
    ]),
  ]),
]);

export const placeOpponentCardsTrigger = trigger('placeOpponentCards', [
  transition(':enter', [
    query('.uno-card-container', [
      style({ display: "none" }),
    ], { optional: true }),
  ]),
]);

export const leftPlayerCardActivityTrigger = trigger('leftPlayerCardActivity', [
  state('stationary', style({
    top: "0px",
    left: "0px",
    height: "5.5rem", 
    width: "4rem",
    display: "unset",
  }),
  { params: { xOriginPosition: 0, yOriginPosition: 0 }}
  ),
  state('discard', style({
    top: "{{yDiscardPosition}}px",
    left: "{{xDiscardPosition}}px",
    height: "6rem", 
    width: "4.2rem",
    display: "none",
  }),  {
    params: { xDiscardPosition: 0, yDiscardPosition: 0 },
  }),
  transition('void => stationary', [
    query('.uno-card-container', [
      style({
        top: "{{yOriginPosition}}px",
        left: "{{xOriginPosition}}px",
        transform: "rotateY(180deg) rotateZ(-90deg)",
        height: "6rem",
        width: "4.2rem",
      }),
      group([
        animate('0.7s 0.5s ease-in-out', 
          style({
            top: "0px",
            left: "0px",
            height: "5.5rem", 
            width: "4rem",
          }),
        ),
        animate('0.6s 0.5s ease-in-out', 
          style({ transform: "rotateY(180deg) rotateZ(-180deg)", })
        ),
      ]),
    ]),
  ]),
  transition('stationary => discard', [
    query('.uno-card-container', [
      style({
        top: "0px",
        left: "0px",
        height: "5.5rem",
        width: "4rem",
        transform: "rotateY(180deg) rotateZ(180deg)",
      }),
      group([
        animate('1s 0.5s ease-in-out', 
          style({
            top: "{{yDiscardPosition}}px",
            left: "{{xDiscardPosition}}px",
            height: "6rem", 
            width: "4.2rem",
          }),
        ),
        animate('1s 0.5s ease-in-out', keyframes([
          style({ transform: "rotateY(180deg) rotateZ(180deg)", }),
          style({ transform: "rotateY(90deg) rotateZ(135deg)", }),
          style({ transform: "rotateY(0deg) rotateZ(90deg)", }),
        ]),),
      ]),
      animate('0s 1s', style({ display: "none" })),
    ]),
  ]),
]);

export const rightPlayerCardActivityTrigger = trigger('rightPlayerCardActivity', [
  state('stationary', style({
    top: "0px",
    left: "0px",
    height: "5.5rem", 
    width: "4rem",
    display: "unset",
  }),
  { params: { xOriginPosition: 0, yOriginPosition: 0 }}
  ),
  state('discard', style({
    top: "{{yDiscardPosition}}px",
    left: "{{xDiscardPosition}}px",
    height: "6rem", 
    width: "4.2rem",
    display: "none",
  }),  {
    params: { xDiscardPosition: 0, yDiscardPosition: 0 },
  }),
  transition('void => stationary', [
    query('.uno-card-container', [
      style({
        top: "{{yOriginPosition}}px",
        left: "{{xOriginPosition}}px",
        transform: "rotateY(180deg) rotateZ(90deg)",
        height: "6rem",
        width: "4.2rem",
      }),
      group([
        animate('0.7s 0.5s ease-in-out', 
          style({
            top: "0px",
            left: "0px",
            height: "5.5rem", 
            width: "4rem",
          }),
        ),
        animate('0.6s 0.5s ease-in-out', 
          style({ transform: "rotateY(180deg) rotateZ(-180deg)", })
        ),
      ]),
    ]),
  ]),
  transition('stationary => discard', [
    query('.uno-card-container', [
      style({
        top: "0px",
        left: "0px",
        height: "5.5rem",
        width: "4rem",
        transform: "rotateY(180deg) rotateZ(180deg)",
      }),
      group([
        animate('1s 0.5s ease-in-out', 
          style({
            top: "{{yDiscardPosition}}px",
            left: "{{xDiscardPosition}}px",
            height: "6rem", 
            width: "4.2rem",
          }),
        ),
        animate('1s 0.5s ease-in-out', keyframes([
          style({ transform: "rotateY(180deg) rotateZ(180deg)", }),
          style({ transform: "rotateY(90deg) rotateZ(90deg)", }),
          style({ transform: "rotateY(0deg) rotateZ(0deg)", }),
          style({ transform: "rotateY(0deg) rotateZ(-90deg)", }),
        ]),),
      ]),
      animate('0s 1s', style({ display: "none" })),
    ]),
  ]),
]);