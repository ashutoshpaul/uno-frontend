import { animate, state, style, group, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum CARD_ANIMATION_ENUM {
  stationary = "stationary",
  peep = "peep",
  end = "end",
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('addToDiscard', [
      state('stationary', style({})),
      state('peep', style({
        boxShadow: "black 2px 2px 4px",
        top: "-1.5rem",
        minWidth: "5rem",
      })),
      state('end', style({
        top: "{{yPosition}}px",
        right: "{{xPosition}}px",
        display: "none",
      }), {
        params: { xPosition: 0, yPosition: 0 },
      }),
      transition('stationary <=> peep', [
        animate('0.2s ease-in-out'),
      ]),
      transition('peep => end', [
        group([
          // animate('0.7s', style({ width: "5rem", })),
          animate('0.7s ease-in-out'),
        ]),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  cards$: Observable<{ state: CARD_ANIMATION_ENUM }[]>;

  readonly STATES: typeof CARD_ANIMATION_ENUM = CARD_ANIMATION_ENUM;

  readonly cards: { state: CARD_ANIMATION_ENUM }[] = [
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
    { state: CARD_ANIMATION_ENUM.stationary },
  ];

  constructor() {}

  ngOnInit(): void {
    this.cards$ = of(this.cards);
  }

  clickCard(cardIndex: number): void {
    this._setCardState(cardIndex, CARD_ANIMATION_ENUM.end);
    console.log(this._getCardState(cardIndex));
  }

  cardHovering(cardIndex: number): void {
    if(this._getCardState(cardIndex) == CARD_ANIMATION_ENUM.stationary) {
      this._setCardState(cardIndex, CARD_ANIMATION_ENUM.peep);
    }
  }

  cardHovered(cardIndex: number): void {
    if(this._getCardState(cardIndex) === CARD_ANIMATION_ENUM.peep) {
      this._setCardState(cardIndex, CARD_ANIMATION_ENUM.stationary);
    }
  }

  destinationOfDiscardPileYPosition(cardIndex: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    const cardBottomGap: number = dashboardHeight - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().bottom;
    const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap;
    return destinationYPosition;
  }

  destinationOfDiscardPileXPosition(cardIndex: number): number {
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const cardLeftGap: number = dashboardWidth - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().left;
    const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
    return destinationXPosition;
  }

  private _setCardState(cardIndex: number, state: CARD_ANIMATION_ENUM): void {
    this.cards[cardIndex].state = state;
  }

  private _getCardState(cardIndex: number): CARD_ANIMATION_ENUM {
    return this.cards[cardIndex].state;
  }

  private _updateCardsTray(): void {
    this.cards$ = of(this.cards);
  }
}
