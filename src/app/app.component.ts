import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

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
        // top: "-1.5rem",
        // minWidth: "5rem",
      })),
      state('end', style({
        top: "{{yPosition}}px",
        right: "{{xPosition}}px",
        display: "none",
      }), {
        params: { xPosition: 0, yPosition: 0 },
      }),
      transition('stationary <=> peep', [
        group([
          animate('0s', style({})),
          animate('0.2s ease-in-out'),
        ]),
      ]),
      transition('peep => end', [
        animate('0.4s ease-in-out'),
        // group([
        // ]),
      ]),
    ]),
  ]
})
export class AppComponent {
  readonly cards: { state: CARD_ANIMATION_ENUM }[] = [
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
    { state: CARD_ANIMATION_ENUM.peep },
  ];
  
  isSentToDiscard: boolean = false;

  clickCard(cardIndex: number): void {
    console.log('start:', this.cards[cardIndex].state);
    this._setCardState(cardIndex, CARD_ANIMATION_ENUM.end);
    console.log('end:', this.cards[cardIndex].state);
  }

  cardHovering(cardIndex: number): void {
    // this._setCardState(cardIndex, CARD_ANIMATION_ENUM.peep);
  }

  cardHovered(cardIndex: number): void {
    // this._setCardState(cardIndex, CARD_ANIMATION_ENUM.stationary);
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
}
