import { Component, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from '../core/enums/animation.enum';
import { 
  revealCardsTrigger, 
  drawerDeckCardActivityTrigger, 
  cardActivityTrigger, 
  frontPlayerCardActivityTrigger, 
  placeOpponentCardsTrigger,
  leftPlayerCardActivityTrigger,
  rightPlayerCardActivityTrigger,
  shuffleCardsTrigger,
} from '../dashboard-animations.animation';
import { ChooseColorDialogComponent } from '../dialogs/choose-color-dialog/choose-color-dialog.component';
import { OptionsDialogComponent } from '../dialogs/options-dialog/options-dialog.component';
import {
  chooseColorDialogIncomingOptionsConstant, 
  chooseColorDialogOutgoingOptionsConstant,
  optionsDialogIncomingOptionsConstant,
  optionsDialogOutgoingOptionsConstant,
} from '../core/constants/animations.constants';

@Component({
  selector: 'app-multi-player',
  templateUrl: './multi-player.component.html',
  styleUrls: ['./multi-player.component.scss'],
  animations: [
    revealCardsTrigger,
    drawerDeckCardActivityTrigger,
    cardActivityTrigger,
    frontPlayerCardActivityTrigger,
    placeOpponentCardsTrigger,
    leftPlayerCardActivityTrigger,
    rightPlayerCardActivityTrigger,
    shuffleCardsTrigger,
  ],
})
export class MultiPlayerComponent implements OnInit {

  isDrawerDeckCardRevealed: boolean = false;

  cards$: Observable<{ state: CARD_ANIMATION_ENUM }[]>;

  readonly STATES: typeof CARD_ANIMATION_ENUM = CARD_ANIMATION_ENUM;

  readonly cards: { state: CARD_ANIMATION_ENUM, isLegal: boolean, color: "black" | "blue" | "green" | "red" | "yellow" }[] = [
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
  ];

  readonly opponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
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
  ];

  readonly leftOpponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  readonly rightOpponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  isCardsTrayEnabled: boolean;
  isShuffleCards: boolean = false;

  constructor(
    private readonly _dialog: NgDialogAnimationService,
  ) {}

  ngOnInit(): void {
    this.toggleCardsTray(false);
    this.cards$ = of(this.cards);

    setTimeout(() => {
      this.promptLegalCards();
    }, 4000);

    // distribute cards
    // let i = 0;
    // setInterval(() => {
    //   if (i % 4 == 0) {
    //     this.addCard();
    //   } else if (i % 4 == 1) {
    //     this.addCardToLeftPlayer();
    //   } else if (i % 4 == 2) {
    //     this.addCardToFrontPlayer();
    //   } else if (i % 4 == 3) {
    //     this.addCardToRightPlayer();
    //   }
    //   i++;
    // }, 500);
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

  destinationOfDiscardPileXPositionFromDrawerDeck(): number {
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
    const destinationXPosition: number = discardPileXPosition - drawerDeckXPosition;
    return destinationXPosition;
  }

  addCard(): void {
    this.toggleCardsTray(false);
    this.cards.push({ state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" });
  }
  
  addCardToFrontPlayer() {
    this.opponentCards.unshift({ state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
  }

  frontPlayerCardClicked(cardIndex: number): void {
    this.opponentCards[cardIndex].state = OPPONENT_CARD_ANIMATION_ENUM.discard;
  }

  addCardToLeftPlayer() {
    this.leftOpponentCards.unshift({ state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
  }

  leftPlayerCardClicked(cardIndex: number): void {
    this.leftOpponentCards[cardIndex].state = OPPONENT_CARD_ANIMATION_ENUM.discard;
  }

  addCardToRightPlayer() {
    this.rightOpponentCards.unshift({ state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
  }

  rightPlayerCardClicked(cardIndex: number): void {
    this.rightOpponentCards[cardIndex].state = OPPONENT_CARD_ANIMATION_ENUM.discard;
  }

  discardDrawerDeckCard(): void {
    this.isDrawerDeckCardRevealed = !this.isDrawerDeckCardRevealed;
  }

  shuffleCards(): void {
    this.isShuffleCards = !this.isShuffleCards;
  }

  chooseColor(): void {
    const dialogRef = this._dialog.open(ChooseColorDialogComponent, {
      animation: {
        incomingOptions: chooseColorDialogIncomingOptionsConstant,
        outgoingOptions: chooseColorDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  openOptionsDialog(): void {
    const dialogRef = this._dialog.open(OptionsDialogComponent, {
      animation: {
        to: "top",
        // incomingOptions: optionsDialogIncomingOptionsConstant,
        // outgoingOptions: optionsDialogOutgoingOptionsConstant,
      },
      panelClass: 'options-dialog',
      position: { bottom: "0rem", right: "1.5vw" }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
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
