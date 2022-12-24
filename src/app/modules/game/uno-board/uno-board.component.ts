import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { combineLatest, fromEvent, Observable, of } from 'rxjs';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { 
  chooseColorDialogIncomingOptionsConstant, 
  chooseColorDialogOutgoingOptionsConstant, 
  alertDialogIncomingOptionsConstant, 
  alertDialogOutgoingOptionsConstant, 
  skipAlertDialogIncomingOptionsConstant, 
  skipAlertDialogOutgoingOptionsConstant, 
  optionsDialogIncomingOptionsConstant, 
  optionsDialogOutgoingOptionsConstant, 
  offlineOpponentDialogIncomingOptionsConstant, 
  offlineOpponentDialogOutgoingOptionsConstant 
} from 'src/app/core/constants/animations.constants';
import { DURATION } from 'src/app/core/constants/durations.constants';
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from 'src/app/core/enums/animation.enum';
import { ChooseColorDialogComponent } from 'src/app/dialogs/actions/choose-color-dialog/choose-color-dialog.component';
import { OfflinePlayerDialogComponent } from 'src/app/dialogs/actions/offline-player-dialog/offline-player-dialog.component';
import { OptionsDialogComponent } from 'src/app/dialogs/actions/options-dialog/options-dialog.component';
import { ChosenColorDialogComponent } from 'src/app/dialogs/reactions/chosen-color-dialog/chosen-color-dialog.component';
import { JoinPlayersDialogComponent } from 'src/app/dialogs/reactions/join-players-dialog/join-players-dialog.component';
import { OfflineDialogComponent } from 'src/app/dialogs/reactions/offline-dialog/offline-dialog.component';
import { ReverseDialogComponent } from 'src/app/dialogs/reactions/reverse-dialog/reverse-dialog.component';
import { SkipDialogComponent } from 'src/app/dialogs/reactions/skip-dialog/skip-dialog.component';
import { PlayersLeftDialogComponent } from 'src/app/dialogs/reactions/players-left-dialog/players-left-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IOptionsResponse } from 'src/app/core/interfaces/dialog-response.interface';
import { NOTIFICATION_EVENT } from 'src/app/core/enums/notification.enum';
import { IGameNotification } from 'src/app/core/interfaces/notification.interface';
import { buttonAppearTrigger, unoButtonSlideTrigger } from 'src/app/core/animations/button.animation';
import { 
  revealCardsTrigger,
  drawerDeckCardActivityTrigger,
  cardActivityTrigger,
  topPlayerCardActivityTrigger,
  placeOpponentCardsTrigger,
  leftPlayerCardActivityTrigger,
  rightPlayerCardActivityTrigger,
  shuffleCardsTrigger,
} from 'src/app/core/animations/card.animation';
import { messageNotificationTrigger, gameNotificationTrigger } from 'src/app/core/animations/notification.animation';
import { PLAYER_POSITION, UnoPositionType } from 'src/app/core/enums/player-position.enum';
import { unoTrigger } from 'src/app/core/animations/uno.animation';
import { SessionStorageService, SESSION_KEY } from 'src/app/core/services/session-storage.service';
import { GameService } from 'src/app/core/services/game.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { IClientGameState, IMappedGame } from 'src/app/core/interfaces/game.interface';
import { ICard, IOpponentCard } from 'src/app/core/interfaces/card-interfaces/card.interface';
import { COLOR_CODE, ValidColorCodeType } from 'src/app/core/enums/websocket-enums/card-enums/card-colors.enum';
import { ICurrentPlayer } from 'src/app/core/interfaces/player.interface';
import { DIRECTION } from 'src/app/core/enums/direction.enum';
import { CARD_ACTION, CARD_TYPE } from 'src/app/core/enums/websocket-enums/card-enums/card-types.enum';
import { IActionCard } from 'src/app/core/interfaces/card-interfaces/card-data.interface';
import { IdentityService } from 'src/app/core/services/identity.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-uno-board',
  templateUrl: './uno-board.component.html',
  styleUrls: ['./uno-board.component.scss'],
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
    messageNotificationTrigger,
    gameNotificationTrigger,
    unoButtonSlideTrigger,
    unoTrigger,
  ],
})
export class UnoBoardComponent implements OnInit, AfterViewInit, OnDestroy {

  isDrawerDeckCardRevealed: boolean = false;

  currentPlayerPosition: PLAYER_POSITION;

  online$: Observable<Event>; // IMP
  offline$: Observable<Event>; // IMP

  unoButtonState$: Observable<'stationary' | 'slide'>;

  isMessageNotificationTriggered$: Observable<boolean>;
  isShuffleCards: boolean = false;

  notification$: Observable<IGameNotification>;

  unoTrigger$: Observable<{ isTriggered: boolean, position: UnoPositionType }>;

  leftOpponentCards$: Observable<IOpponentCard[]>; // IMP
  topOpponentCards$: Observable<IOpponentCard[]>; // IMP
  rightOpponentCards$: Observable<IOpponentCard[]>; // IMP
  bottomCards$: Observable<ICard[]>; // IMP

  lastDrawnCard$: Observable<ICard>; // IMP

  currentColor$: Observable<ValidColorCodeType>; // IMP
  currentDirection$: Observable<DIRECTION>; // IMP
  currentPlayer$: Observable<ICurrentPlayer>; // IMP

  isMyTurn$: Observable<boolean>; // IMP
  isNewCardPickable$: Observable<boolean>; // IMP
  isMyTurnSkippable$: Observable<boolean>; // IMP

  // readonly myCards: { state: CARD_ANIMATION_ENUM, isLegal: boolean, color: "black" | "blue" | "green" | "red" | "yellow" }[] = [
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: !false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
    // { state: CARD_ANIMATION_ENUM.stationary, isLegal: false, color: "red" },
  // ];

  readonly topOpponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  leftOpponentCards: IOpponentCard[] = [
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  readonly rightOpponentCards: { state: OPPONENT_CARD_ANIMATION_ENUM }[] = [
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
    // { state: OPPONENT_CARD_ANIMATION_ENUM.stationary },
  ];

  isCardsTrayEnabled: boolean; // TODO remove
  isPickCard: boolean = false;

  public readonly playerPosition: typeof PLAYER_POSITION = PLAYER_POSITION;
  readonly STATES: typeof CARD_ANIMATION_ENUM = CARD_ANIMATION_ENUM;

  get isClockwise(): boolean { return this._playerService.gameState?.currentDirection === DIRECTION.clockwise; }

  get gameState(): IClientGameState { return this._playerService.gameState; }

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _gameService: GameService,
    private readonly _chatService: ChatService,
    private readonly _websocketService: WebsocketService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _playerService: PlayerService,
    private readonly _identityService: IdentityService,
  ) {}

  ngOnInit(): void {
    this._websocketService; // ESTABLISHES CONNECTION. DO NOT REMOVE!
    this.registerInternetEvents();

    // display JoinPlayersDialogComponent if all players have not joined game yet.
    const hasAllPlayersJoined: boolean = this._sessionStorage.getItem(SESSION_KEY.hasAllPlayersJoined) == 'true';
    if (!hasAllPlayersJoined) {
      this._gameService.openJoinedPlayersPopup();
    }

    // listen to incoming messages
    this.isMessageNotificationTriggered$ = this._chatService.isMessageNotificationTriggered$;
    
    // listen to shuffle-cards event trigger
    this._subSink.add(
      this._playerService.isShuffleCardsEventTriggered$.subscribe((isTriggered: boolean) => {
        this.isShuffleCards = isTriggered;
      })
    );

    // get current game state on screen refresh
    const isCardsDistributed: boolean = this._sessionStorage.getItem(SESSION_KEY.isCardsDistributed) == 'true';
    if (isCardsDistributed) {
      this._subSink.add(
        this._gameService.getGameState().subscribe((data: IMappedGame) => {
          console.log('*', data);
          this._playerService.setGameState(data);
        })
      );
    }

    /**
     * To handle an exception case.
     * 
     * 
     * Distribte cards.
     * * This observable's .subscribe() condition should get executed when the game was just started
     *   and the host hits the refresh button of the browser.
     *   i.e., when countdown (3..2..1..) had started BUT not finished.
     * 
     * * Usecase: When cards are not distributed using the normal flow control (by the host) i.e., by sending
     *            the distribute-cards POST API request.
     *            Then, cards should be distributed (send POST request) from here.
     */
     this._subSink.add(
       combineLatest([
         this._playerService.isSocketConnectedToServer$,
         this._gameService.isCountDownStarted$
       ]).subscribe((args: boolean[]) => {
         /**
          * Conditions:
          * 1. isSocketConnectedToServer$:
          *   a. true - socket is connected to server
          *   b. false - socket is not connected to server (in the process of connection)
          * 2. isCountDownStarted$:
          *   a. true - join-players-dialog is opened. Once its closed then cards will be distributed (if host)
          *   b. false - join-players-dialog WAS opened and NOW its closed. Cards were distributed once it was closed.
          *   c. null - player refreshed the screen when countdown was happening and had not finished. ERROR!!!
          * 
          * Our situation:
          * * Send distributeCards POST request when coutdown was happening AND host refresh the screen.
          * * And, after socket is reconnected to the server i.e., values of
          *   isSocketConnectedToServer$ == 'true' and isCountDownStarted$ == null.
          */
         if (args[0] == true && args[1] == null) {
           this._identityService.isHost && this._playerService.distributeCards();
         }
       })
     );

    // set cards
    this.leftOpponentCards$ = this._playerService.leftOpponentCards$;
    this.topOpponentCards$ = this._playerService.topOpponentCards$;
    this.rightOpponentCards$ = this._playerService.rightOpponentCards$;
    this.bottomCards$ = this._playerService.bottomCards$;

    // set game properties
    this.lastDrawnCard$ = this._playerService.lastDrawnCard$;
    this.currentColor$ = this._playerService.currentColor$;
    this.currentDirection$ = this._playerService.currentDirection$;
    this.currentPlayer$ = this._playerService.currentPlayer$;

    // listen clickable events
    this.isMyTurn$ = this._playerService.isMyTurn$;
    this.isNewCardPickable$ = this._playerService.isNewCardPickable$;
    this.isMyTurnSkippable$ = this._playerService.isMyTurnSkippable$;

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
    this.currentPlayerPosition = PLAYER_POSITION.bottom; // IMP
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

  ngAfterViewInit(): void {
    // this._cdRef.detectChanges();
  }

  registerInternetEvents(): void {
    this.online$ = fromEvent(window, 'online');
    this.offline$ = fromEvent(window, 'offline');

    let dialogRef: MatDialogRef<OfflineDialogComponent>;

    this._subSink.add(
      this.offline$.subscribe(_ => {
        dialogRef = this._dialog.open(OfflineDialogComponent, {
          animation: {
            incomingOptions: chooseColorDialogIncomingOptionsConstant,
            outgoingOptions: chooseColorDialogOutgoingOptionsConstant,
          },
          panelClass: 'choose-color-dialog'
        });
      })
    );

    this._subSink.add(
      this.online$.subscribe(_ => {
        // fetch fresh game state
        this._gameService.getGameState().subscribe((data: IMappedGame) => {
          console.log('game state refreshed', data);
          this._playerService.setGameState(data);
        });
        if(dialogRef) dialogRef.close();
      })
    );
  }

  /**
   * * Disables player's cards once he 
   * 1. discards (plays) a card
   * 2. picks a card.
   */
  disableMyTurn(event?: AnimationEvent): void {
    if (!event) return this._playerService.emitIsMyTurn(false);
    if (event.toState == CARD_ANIMATION_ENUM.discard) {
      this._playerService.emitIsMyTurn(false);
    }
  }

  // for testing purpose TODO remove
  enableMyTurn(): void {
    this._playerService.emitIsMyTurn();
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
    this.gameState.mappedPlayers.bottom?.cards.map((card, index) => 
      card.isLegal && this._setCardState(index, CARD_ANIMATION_ENUM.prompt
    ));
  }

  setCardsToStationaryState(): void {
    this.gameState.mappedPlayers.bottom?.cards.forEach((card, index) => {
      card.isLegal = false;
      this._setCardState(index, CARD_ANIMATION_ENUM.stationary);
    });
  }

  // TODO remove
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
    this.disableMyTurn();
    this.isPickCard = false;
    this.gameState.mappedPlayers.bottom?.cards.push({
      state: CARD_ANIMATION_ENUM.stationary,
      isLegal: false,
      data: <IActionCard>{
        action: CARD_ACTION.drawTwoCards,
        color: COLOR_CODE.blue,
      },
      id: '',
      type: CARD_TYPE.action,
    });
  }

  addCardToFrontPlayer() {
    this.topOpponentCards.unshift({ state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
  }

  frontPlayerCardClicked(cardIndex: number): void {
    this.topOpponentCards[cardIndex].state = OPPONENT_CARD_ANIMATION_ENUM.discard;
  }

  addCardToLeftPlayer() {
    this.leftOpponentCards.unshift({ index: -1, state: OPPONENT_CARD_ANIMATION_ENUM.stationary });
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

  // test purpose
  shuffleCards(): void {
    this._playerService.toggleShuffleCardsEventTrigger();
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

    this._subSink.add(
      dialogRef.afterClosed().subscribe((response: IOptionsResponse) => {
        if(response?.isExit) {
          setTimeout(() => {
            this._router.navigate(['./../', 'lobby'], { relativeTo: this._activatedRoute });
          }, DURATION.delayOptionsDialog);
        }
      })
    );
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

  allPlayersLeft(): void {
    const dialogRef = this._dialog.open(PlayersLeftDialogComponent, {
      animation: {
        incomingOptions: offlineOpponentDialogIncomingOptionsConstant,
        outgoingOptions: offlineOpponentDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  openSnackbar(): void {
    this.notification$ = of(<IGameNotification>{
      event: NOTIFICATION_EVENT.drawFourCards
    });
  }

  toggleGameDirection(): void {
    // this.isClockwise = !this.isClockwise;
  }

  pickCard(): void {
    this.isPickCard = !this.isPickCard;
  }

  // test purpose TODO remove
  toggleSkip(): void {
    this._playerService.emitIsMyTurnSkippable(true);
  }

  skip(): void {
    this._playerService.emitIsMyTurnSkippable(false);
  }

  skipHover(isHover: boolean = false): void {
    this.unoButtonState$ = (isHover) ? of('slide') : of('stationary');
  }

  uno(): void {}

  notifyMessage(): void {
    this.isMessageNotificationTriggered$ = of(true);
  }

  resetMessageNotification(): void {
    this._chatService.toggleMessageNotificationTrigger(false);
  }

  resetShuffleCardsEvent(): void {
    this.isShuffleCards = false;
  }

  resetGameNotification(): void {
    this.notification$ = of(null);
  }

  unoTrigger(): void {
    this.unoTrigger$ = of({ isTriggered: true, position: PLAYER_POSITION.left });
  }

  resetUnoTrigger(): void {
    this.unoTrigger$ = of({ isTriggered: false, position: PLAYER_POSITION.left });
  }

  private _setCardState(cardIndex: number, state: CARD_ANIMATION_ENUM): void {
    if (this.gameState.mappedPlayers.bottom) this.gameState.mappedPlayers.bottom.cards[cardIndex].state = state;
  }

  private _getCardState(cardIndex: number): CARD_ANIMATION_ENUM {
    return this.gameState.mappedPlayers.bottom.cards[cardIndex].state;
  }

  private _isCardLegal(cardIndex: number): boolean {
    return this.gameState.mappedPlayers.bottom.cards[cardIndex].isLegal;
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

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
