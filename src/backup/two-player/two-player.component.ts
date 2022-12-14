import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AnimationEvent  } from "@angular/animations";
import { revealCardsTrigger, drawerDeckCardActivityTrigger, cardActivityTrigger, topPlayerCardActivityTrigger, placeOpponentCardsTrigger } from 'src/app/core/animations/card.animation';
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from 'src/app/core/enums/animation.enum';

@Component({
  selector: 'app-two-player',
  templateUrl: './two-player.component.html',
  styleUrls: ['./two-player.component.scss'],
  animations: [
    revealCardsTrigger,
    drawerDeckCardActivityTrigger,
    cardActivityTrigger,
    topPlayerCardActivityTrigger,
    placeOpponentCardsTrigger,
  ],
})
export class TwoPlayerComponent implements OnInit {
  isDrawerDeckCardRevealed: boolean = false;

  cards$: Observable<{ state: CARD_ANIMATION_ENUM }[]>;

  readonly STATES: typeof CARD_ANIMATION_ENUM = CARD_ANIMATION_ENUM;

  readonly cards: { state: CARD_ANIMATION_ENUM, isLegal: boolean }[] = [
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: !false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: !false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: !false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
    // { state: CARD_ANIMATION_ENUM.secret, isLegal: false },
  ];

  readonly opponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  isCardsTrayEnabled: boolean;

  constructor() {}

  ngOnInit(): void {
    this.toggleCardsTray(false);
    this.cards$ = of(this.cards);

    setTimeout(() => {
      this.promptLegalCards();
    }, 4000);
  }

  cardClicked(cardIndex: number): void {
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

  promptLegalCards(): void {
    this.cards.map((card, index) => 
      card.isLegal && this._setCardState(index, CARD_ANIMATION_ENUM.prompt
    ));
  }

  disableCardsTrayTemporarily(event: AnimationEvent): void {
    if(event.toState == CARD_ANIMATION_ENUM.discard) {
      this.toggleCardsTray(false);
      setTimeout(() => {
        this.toggleCardsTray();
      }, event.totalTime + 150);
    }
  }

  toggleCardsTray(isEnabled: boolean = true): void {
    this.isCardsTrayEnabled = isEnabled;
  }

  destinationOfDiscardPileYPosition(cardIndex: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    const cardBottomGap: number = dashboardHeight - document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().bottom;
    // 1rem = 16px (1.5rem = 24px)
    const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap + 24 + 5;
    return destinationYPosition;
  }

  destinationOfDiscardPileXPosition(cardIndex: number): number {
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const cardLeftGap: number = dashboardWidth - document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().left;
    const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap + 5;
    return destinationXPosition;
  }

  destinationOfDiscardPileXPositionFromDrawerDeck(): number {
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
    const destinationXPosition: number = discardPileXPosition - drawerDeckXPosition;
    return destinationXPosition;
  }

  originOfCardYPosition(): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const drawerDeckYPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().bottom;
    const originOfCardY: number = dashboardHeight - drawerDeckYPosition - 52;
    return originOfCardY;
  }

  originOfCardXPosition(cardIndex: number): number {
    const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
    const cardXPosition: number = document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().left;
    const originOfCardXPosition: number = drawerDeckXPosition - cardXPosition;
    return originOfCardXPosition;
  }

  addCard(): void {
    this.toggleCardsTray(false);
    this.cards.push({ state: CARD_ANIMATION_ENUM.stationary, isLegal: false });
  }

  discardDrawerDeckCard(): void {
    this.isDrawerDeckCardRevealed = !this.isDrawerDeckCardRevealed;
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

  // front player
  addCardToFrontPlayer() {
    this.opponentCards.unshift({ state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
  }

  destinationOfFrontPlayerDiscardPileYPosition(cardIndex: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    const cardBottomGap: number = dashboardHeight - document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().bottom;
    const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap + 16;
    return destinationYPosition;
  }

  destinationOfFrontPlayerDiscardPileXPosition(cardIndex: number): number {
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const cardLeftGap: number = dashboardWidth - document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
    const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
    return destinationXPosition;
  }

  originOfFrontPlayerCardYPosition(): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const drawerDeckYPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().bottom;
    const originOfCardY: number = dashboardHeight - drawerDeckYPosition - 5.5 * 16;
    return originOfCardY;
  }

  originOfFrontPlayerCardXPosition(cardIndex: number): number {
    const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
    const cardXPosition: number = document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
    const originOfCardXPosition: number = drawerDeckXPosition - cardXPosition;
    return originOfCardXPosition;
  }

  frontPlayerCardClicked(cardIndex: number): void {
    this.opponentCards[cardIndex].state = OPPONENT_CARD_ANIMATION_ENUM.discard;
  }

}
