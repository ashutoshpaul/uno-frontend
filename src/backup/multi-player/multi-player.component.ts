import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { NgDialogAnimationService } from "ng-dialog-animation";
import { Observable, of, fromEvent } from "rxjs";
import { buttonAppearTrigger } from "src/app/core/animations/button.animation";
import { revealCardsTrigger, drawerDeckCardActivityTrigger, cardActivityTrigger, topPlayerCardActivityTrigger, placeOpponentCardsTrigger, leftPlayerCardActivityTrigger, rightPlayerCardActivityTrigger, shuffleCardsTrigger } from "src/app/core/animations/card.animation";
import { chooseColorDialogIncomingOptionsConstant, chooseColorDialogOutgoingOptionsConstant, alertDialogIncomingOptionsConstant, alertDialogOutgoingOptionsConstant, skipAlertDialogIncomingOptionsConstant, skipAlertDialogOutgoingOptionsConstant, optionsDialogIncomingOptionsConstant, optionsDialogOutgoingOptionsConstant, offlineOpponentDialogIncomingOptionsConstant, offlineOpponentDialogOutgoingOptionsConstant } from "src/app/core/constants/animations.constants";
import { DURATION } from "src/app/core/constants/durations.constants";
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from "src/app/core/enums/animation.enum";
import { ChooseColorDialogComponent } from "src/app/dialogs/actions/choose-color-dialog/choose-color-dialog.component";
import { OfflinePlayerDialogComponent } from "src/app/dialogs/actions/offline-player-dialog/offline-player-dialog.component";
import { OptionsDialogComponent } from "src/app/dialogs/actions/options-dialog/options-dialog.component";
import { ChosenColorDialogComponent } from "src/app/dialogs/reactions/chosen-color-dialog/chosen-color-dialog.component";
import { JoinPlayersDialogComponent } from "src/app/dialogs/reactions/join-players-dialog/join-players-dialog.component";
import { OfflineDialogComponent } from "src/app/dialogs/reactions/offline-dialog/offline-dialog.component";
import { ReverseDialogComponent } from "src/app/dialogs/reactions/reverse-dialog/reverse-dialog.component";
import { SkipDialogComponent } from "src/app/dialogs/reactions/skip-dialog/skip-dialog.component";
import { AnimationEvent } from "@angular/animations";
import { PLAYER_POSITION } from "src/app/core/enums/player-position.enum";
import { COLOR_CODE, ValidColorCodeType } from "src/app/core/enums/websocket-enums/card-enums/card-colors.enum";
import { DIRECTION } from "src/app/core/enums/direction.enum";

@Component({
  selector: 'app-multi-player',
  templateUrl: './multi-player.component.html',
  styleUrls: ['./multi-player.component.scss'],
  animations: [
    revealCardsTrigger,
    drawerDeckCardActivityTrigger,
    cardActivityTrigger,
    topPlayerCardActivityTrigger,
    placeOpponentCardsTrigger,
    leftPlayerCardActivityTrigger,
    rightPlayerCardActivityTrigger,
    shuffleCardsTrigger,
    buttonAppearTrigger,
  ],
})
export class MultiPlayerComponent implements OnInit {

  gameDirection: DIRECTION = DIRECTION.clockwise;

  isDrawerDeckCardRevealed: boolean = false;

  isSkipVisible: boolean = false;

  currentPlayerPosition: PLAYER_POSITION;

  colorCode: ValidColorCodeType;

  cards$: Observable<{ state: CARD_ANIMATION_ENUM }[]>;

  online$: Observable<Event>;
  offline$: Observable<Event>;

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
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  readonly rightOpponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
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
  isShuffleCards: boolean = false;
  isPickCard: boolean = false;

  set clockwise(isClockwise: boolean) { 
    this.gameDirection = isClockwise ? DIRECTION.clockwise : DIRECTION.antiClockwise; 
  }
  
  get clockwise(): boolean { return this.gameDirection === DIRECTION.clockwise; }

  constructor(
    private readonly _dialog: NgDialogAnimationService,
  ) {}

  ngOnInit(): void {
    this.registerInternetEvents();
    this.toggleCardsTray(false);
    this.cards$ = of(this.cards);

    this.colorCode = COLOR_CODE.green;

    // setTimeout(() => {
    //   this.promptLegalCards();
    // }, 4000);

    // setTimeout(() => {
    //   this.setCardsToStationaryState();
    // }, 6000);

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

    // change current player position
    this.currentPlayerPosition = PLAYER_POSITION.left;
    // setInterval(() => {
    //   if(this.currentPlayerPosition == PLAYER_POSITION.bottom) {
    //     this.currentPlayerPosition = PLAYER_POSITION.left;
    //   } else if (this.currentPlayerPosition == PLAYER_POSITION.left) {
    //     this.currentPlayerPosition = PLAYER_POSITION.top;
    //   } else if (this.currentPlayerPosition == PLAYER_POSITION.top) {
    //     this.currentPlayerPosition = PLAYER_POSITION.right;
    //   } else {
    //     this.currentPlayerPosition = PLAYER_POSITION.bottom;
    //   }
    // }, 4000);
  }

  registerInternetEvents(): void {
    this.online$ = fromEvent(window, 'online');
    this.offline$ = fromEvent(window, 'offline');

    let dialogRef: MatDialogRef<OfflineDialogComponent>;

    this.offline$.subscribe(_ => {
      dialogRef = this._dialog.open(OfflineDialogComponent, {
        animation: {
          incomingOptions: chooseColorDialogIncomingOptionsConstant,
          outgoingOptions: chooseColorDialogOutgoingOptionsConstant,
        },
        panelClass: 'choose-color-dialog'
      });
    });

    this.online$.subscribe(_ => {
      if(dialogRef) dialogRef.close();
    })
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

  setCardsToStationaryState(): void {
    this.cards.forEach((card, index) => {
      card.isLegal = false;
      this._setCardState(index, CARD_ANIMATION_ENUM.stationary);
    });
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
    this.isPickCard = false;
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

  offlineAlert(): void {
    const dialogRef = this._dialog.open(OfflineDialogComponent, {
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

  chosenColorAlert(): void {
    const dialogRef = this._dialog.open(ChosenColorDialogComponent, {
      animation: {
        incomingOptions: chooseColorDialogIncomingOptionsConstant,
        outgoingOptions: chooseColorDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog',
      data: { chosenColor: COLOR_CODE.red },
    });

    // setTimeout(() => {
    //   dialogRef.close();
    // }, 6000);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  reverseAlert(): void {
    const dialogRef = this._dialog.open(ReverseDialogComponent, {
      animation: {
        incomingOptions: alertDialogIncomingOptionsConstant,
        outgoingOptions: alertDialogOutgoingOptionsConstant,
      },
      panelClass: 'alert-dialog',
      data: { 
        color: COLOR_CODE.red,
        direction: DIRECTION.clockwise,
      }
    });

    setTimeout(() => { dialogRef.close(); }, DURATION.alertDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  skipAlert(): void {
    const playerPosition: PLAYER_POSITION = PLAYER_POSITION.bottom;
    const animationDirection: PLAYER_POSITION = this._getSkipAnimationDirection(playerPosition);
    const dialogRef = this._dialog.open(SkipDialogComponent, {
      animation: {
        to: animationDirection,
        incomingOptions: skipAlertDialogIncomingOptionsConstant,
        outgoingOptions: skipAlertDialogOutgoingOptionsConstant,
      },
      panelClass: 'skip-alert-dialog',
      position: { [playerPosition]: "0rem" },
      data: { position: playerPosition }
    });

    setTimeout(() => { dialogRef.close(); }, DURATION.alertDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  openOptionsDialog(): void {
    const dialogRef = this._dialog.open(OptionsDialogComponent, {
      animation: {
        to: "top",
        incomingOptions: optionsDialogIncomingOptionsConstant,
        outgoingOptions: optionsDialogOutgoingOptionsConstant,
      },
      panelClass: 'options-dialog',
      position: { bottom: "0rem", right: "1.5vw" }
    });

    // dialogRef.afterClosed().subscribe((options: IOptions) => {
    //   if(options) {}
    // });
  }

  playersJoinedAlert(): void {
    const dialogRef = this._dialog.open(JoinPlayersDialogComponent, {
      animation: {
        to: "top",
        incomingOptions: optionsDialogIncomingOptionsConstant,
        outgoingOptions: optionsDialogOutgoingOptionsConstant,
      },
      panelClass: 'join-players-dialog',
      position: { bottom: "0rem" },
      data: {
        joinedPlayers: 2,
        totalPlayers: 4,
      },
    });

    // dialogRef.afterClosed().subscribe((options: IOptions) => {
    //   if(options) {}
    // });
  }

  offlinePlayerAction(): void {
    const dialogRef = this._dialog.open(OfflinePlayerDialogComponent, {
      animation: {
        incomingOptions: offlineOpponentDialogIncomingOptionsConstant,
        outgoingOptions: offlineOpponentDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog',
      data: { playerName: 'Samuel' },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  toggleGameDirection(): void {
    this.clockwise = !this.clockwise;
  }

  pickCard(): void {
    this.isPickCard = !this.isPickCard;
  }

  toggleSkip(): void {
    this.isSkipVisible = !this.isSkipVisible;
  }

  skip(): void {
    this.isSkipVisible = false;
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

  private _getSkipAnimationDirection(playerPosition: PLAYER_POSITION): PLAYER_POSITION {
    switch(playerPosition) {
      case PLAYER_POSITION.top:
        return PLAYER_POSITION.bottom;
      case PLAYER_POSITION.bottom:
        return PLAYER_POSITION.top;
      case PLAYER_POSITION.left:
        return PLAYER_POSITION.right;
      case PLAYER_POSITION.right:
        return PLAYER_POSITION.left;
    }
  }

  private _updateCardsTray(): void {
    this.cards$ = of(this.cards);
  }
}
