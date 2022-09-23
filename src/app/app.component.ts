import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum CARD_ANIMATION_ENUM {
  stationary = "stationary",
  prompt = "prompt",
  peep = "peep",
  discard = "discard",
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('addToDiscard', [
      state('void', style({ top: "-50rem" })),
      state('stationary', style({})),
      state('prompt', style({
        top: "-0.9rem",
        minWidth: "5rem",
      })),
      state('peep', style({
        boxShadow: "black 2px 2px 4px",
        top: "-1.5rem",
        minWidth: "5rem",
      })),
      state('discard', style({
        top: "{{yPosition}}px",
        right: "{{xPosition}}px",
        display: "none",
      }), {
        params: { xPosition: 0, yPosition: 0 },
      }),
      transition('stationary <=> peep', [
        animate('0.2s ease-in-out'),
      ]),
      transition('stationary <=> prompt', [
        animate('0.1s ease-in-out'),
      ]),
      transition('prompt <=> peep', [
        animate('0.1s ease-in-out'),
      ]),
      transition('peep => discard', [
        animate('0.7s ease-in-out'),
      ]),
      // transition('void => stationary', [
      //   animate('4s ease-in-out'),
      // ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  isCardsTrayEnabled: boolean = true;

  cards$: Observable<{ state: CARD_ANIMATION_ENUM }[]>;

  readonly STATES: typeof CARD_ANIMATION_ENUM = CARD_ANIMATION_ENUM;

  readonly cards: { state: CARD_ANIMATION_ENUM, isLegal: boolean }[] = [
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
  ];

  constructor() {}

  ngOnInit(): void {
    this.cards$ = of(this.cards);
    setTimeout(() => {
      this.promptLegalCards();
    }, 2000);
  }

  clickCard(cardIndex: number): void {
    this._setCardState(cardIndex, CARD_ANIMATION_ENUM.discard);
  }

  cardHovering(cardIndex: number): void {
    if(this._getCardState(cardIndex) == CARD_ANIMATION_ENUM.stationary ||
    this._getCardState(cardIndex) == CARD_ANIMATION_ENUM.prompt) {
      this._setCardState(cardIndex, CARD_ANIMATION_ENUM.peep);
    }
  }

  cardHovered(cardIndex: number): void {
    if(this._getCardState(cardIndex) === CARD_ANIMATION_ENUM.peep) {
      if(this._isCardLegal(cardIndex)) {
        this._setCardState(cardIndex, CARD_ANIMATION_ENUM.prompt);
      } else {
        this._setCardState(cardIndex, CARD_ANIMATION_ENUM.stationary);
      }
    }
  }

  destinationOfDiscardPileYPosition(cardIndex: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    const cardBottomGap: number = dashboardHeight - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().bottom;
    // 1rem = 16px (1.5rem = 24px)
    const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap + 24;
    return destinationYPosition;
  }

  destinationOfDiscardPileXPosition(cardIndex: number): number {
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const cardLeftGap: number = dashboardWidth - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().left;
    const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
    return destinationXPosition;
  }

  promptLegalCards(): void {
    this.cards.map((card, i) => 
      card.isLegal && this._setCardState(i, CARD_ANIMATION_ENUM.prompt
    ));
  }

  disableCardsTrayTemporarily(event: AnimationEvent): void {
    if(event.toState == CARD_ANIMATION_ENUM.discard) {
      this.isCardsTrayEnabled = false;
      setTimeout(() => {
        this.isCardsTrayEnabled = true;
      }, event.totalTime + 150);
    }
  }

  private _setCardState(cardIndex: number, state: CARD_ANIMATION_ENUM): void {
    this.cards[cardIndex].state = state;
  }

  private _getCardState(cardIndex: number): CARD_ANIMATION_ENUM {
    return this.cards[cardIndex].state;
  }

  private _isCardLegal(cardIndex: number): boolean {
    return this.cards[cardIndex].isLegal;
  }

  private _updateCardsTray(): void {
    this.cards$ = of(this.cards);
  }
}
