import { Injectable } from '@angular/core';
import { IDistributeCardsResponse, IUpdateSocketIdPayload } from '../interfaces/response.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { IdentityService } from './identity.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICard, IOpponentCard } from '../interfaces/card-interfaces/card.interface';
import { ICurrentPlayer } from '../interfaces/player.interface';
import { DIRECTION } from '../enums/direction.enum';
import { ValidColorCodeType } from '../enums/websocket-enums/card-enums/card-colors.enum';
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from '../enums/animation.enum';
import { IClientGameState, IMappedGame, IMappedGameChanges } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  /**
   * 1. Hold logical object of current game state.
   * 2. Should be UPDATED on every event/req/res sent/emitted/received.
   * 3. Any action performed or calculated should take value for any game-related-data from this object.
   * 
   * 4. In short, it represents the current state of the game.
   */
  private _gameState: IClientGameState;

  private readonly _isShuffleCardsEventTriggeredSubject$ = new Subject<boolean>();
  readonly isShuffleCardsEventTriggered$ = this._isShuffleCardsEventTriggeredSubject$.asObservable();

  private readonly _firstCardDiscardedSubject$ = new Subject<ICard>();
  readonly firstCardDiscarded$: Observable<ICard> = this._firstCardDiscardedSubject$.asObservable();

  private readonly _bottomCardsSubject$ = new Subject<ICard[]>();
  readonly bottomCards$: Observable<ICard[]> = this._bottomCardsSubject$.asObservable();

  private readonly _leftOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly leftOpponentCards$: Observable<IOpponentCard[]> = this._leftOpponentCardsSubject$.asObservable();

  private readonly _topOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly topOpponentCards$: Observable<IOpponentCard[]> = this._topOpponentCardsSubject$.asObservable();

  private readonly _rightOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly rightOpponentCards$: Observable<IOpponentCard[]> = this._rightOpponentCardsSubject$.asObservable();
  
  private readonly _lastDrawnCardIdSubject$ = new Subject<string>();
  readonly lastDrawnCardId$: Observable<string> = this._lastDrawnCardIdSubject$.asObservable();
  
  private readonly _currentPlayerSubject$ = new Subject<ICurrentPlayer>();
  readonly currentPlayer$: Observable<ICurrentPlayer> = this._currentPlayerSubject$.asObservable();

  private readonly _currentDirectionSubject$ = new Subject<DIRECTION>();
  readonly currentDirection$: Observable<DIRECTION> = this._currentDirectionSubject$.asObservable();

  private readonly _currentColorSubject$ = new Subject<ValidColorCodeType>();
  readonly currentColor$: Observable<ValidColorCodeType> = this._currentColorSubject$.asObservable();

  // clickable events
  private readonly _isMyTurnSkippableSubject$ = new BehaviorSubject<boolean>(false);
  readonly isMyTurnSkippable$: Observable<boolean> = this._isMyTurnSkippableSubject$.asObservable();
  
  private readonly _isNewCardPickableSubject$ = new BehaviorSubject<boolean>(false);
  readonly isNewCardPickable$: Observable<boolean> = this._isNewCardPickableSubject$.asObservable();
  
  private readonly _isMyTurnSubject$ = new BehaviorSubject<boolean>(false);
  readonly isMyTurn$: Observable<boolean> = this._isMyTurnSubject$.asObservable();

  /**
   * * Created to handle an exception case.
   * * Handles page refreshed by host when countdown (3..2..1..) has started BUT not finished.
   * * (Used in uno-board-component along with isCountDownStarted$)
   * 
   * * Emits true when connection to server is established. Or else emits false (default).
   */
  private readonly _isSocketConnectedToServerSubject$ = new BehaviorSubject<boolean>(false);
  readonly isSocketConnectedToServer$: Observable<boolean> = this._isSocketConnectedToServerSubject$.asObservable();

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _httpService: HttpService,
  ) { }

  connection(): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    const socketId: string = this._sessionStorage.getItem(SESSION_KEY.socketId);
    if(identity && socketId) {
      // update identity with current connection (socket.id)
      const payload: IUpdateSocketIdPayload = { socketId: socketId, identity: identity };
      this._httpService.updatePlayerSocketId(payload).subscribe(_ => {
        console.log('socket.id updated');
        this._emitIsSocketConnectedToServer();
      });
    }
  }

  distributeCards(): void {
    console.log('distributeCards()');
    this._httpService.distributeCards(this._identityService.identity).subscribe((data: IDistributeCardsResponse) => {
      if (data.isCardsShuffledEventEmitted) this.toggleShuffleCardsEventTrigger();
    });
  }

  toggleShuffleCardsEventTrigger(isTrigger: boolean = true): void {
    this._isShuffleCardsEventTriggeredSubject$.next(isTrigger);
  }

  /**
   * Sets (restores) current game state on new-game-start and page-refresh.
   */
  setGameState(mappedGame: IMappedGame): void {
    this.updateGameState(mappedGame);
    if (this._gameState) {
      mappedGame.currentColor && this._currentColorSubject$.next(this._gameState.currentColor);
      mappedGame.currentDirection && this._currentDirectionSubject$.next(this._gameState.currentDirection);
      mappedGame.currentPlayer && this._currentPlayerSubject$.next(this._gameState.currentPlayer);
      mappedGame.lastDrawnCard && this._lastDrawnCardIdSubject$.next(this._gameState.lastDrawnCard.id);
  
      mappedGame.mappedPlayers.left && this._leftOpponentCardsSubject$.next(this._gameState.mappedPlayers.left.cards);
      mappedGame.mappedPlayers.top && this._topOpponentCardsSubject$.next(this._gameState.mappedPlayers.top.cards);
      mappedGame.mappedPlayers.right && this._rightOpponentCardsSubject$.next(this._gameState.mappedPlayers.right.cards);
      mappedGame.mappedPlayers.bottom && this._bottomCardsSubject$.next(this._gameState.mappedPlayers.bottom.cards);
    }
  }

  /**
   * * Single point to update entire _gameState.
   * * Always assigns a new game state.
   */
  updateGameState(mappedGame: IMappedGame): void {
    this._gameState = {
      mappedPlayers: {
        ...(mappedGame.mappedPlayers.left && {
          left: {
            cards: this._createFreshOpponentCards(mappedGame.mappedPlayers.left.cardsCount),
            id: mappedGame.mappedPlayers.left.id,
            isActive: mappedGame.mappedPlayers.left.isActive,
            isCardLeft: mappedGame.mappedPlayers.left.isCardLeft,
            status: mappedGame.mappedPlayers.left.status,
            name: mappedGame.mappedPlayers.left.name,
          },
        }),
        ...(mappedGame.mappedPlayers.top && {
          top: {
            cards: this._createFreshOpponentCards(mappedGame.mappedPlayers.top.cardsCount),
            id: mappedGame.mappedPlayers.top.id,
            isActive: mappedGame.mappedPlayers.top.isActive,
            isCardLeft: mappedGame.mappedPlayers.top.isCardLeft,
            status: mappedGame.mappedPlayers.top.status,
            name: mappedGame.mappedPlayers.top.name,
          },
        }),
        ...(mappedGame.mappedPlayers.right && {
          right: {
            cards: this._createFreshOpponentCards(mappedGame.mappedPlayers.right.cardsCount),
            id: mappedGame.mappedPlayers.right.id,
            isActive: mappedGame.mappedPlayers.right.isActive,
            isCardLeft: mappedGame.mappedPlayers.right.isCardLeft,
            status: mappedGame.mappedPlayers.right.status,
            name: mappedGame.mappedPlayers.right.name,
          },
        }),
        ...(mappedGame.mappedPlayers.bottom && {
          bottom: {
            cards: this._mapBottomCardsToDefaultState(mappedGame.mappedPlayers.bottom.cards),
            id: mappedGame.mappedPlayers.bottom.id,
            isActive: mappedGame.mappedPlayers.bottom.isActive,
            isCardLeft: mappedGame.mappedPlayers.bottom.isCardLeft,
            status: mappedGame.mappedPlayers.bottom.status,
            name: mappedGame.mappedPlayers.bottom.name,
            score: mappedGame.mappedPlayers.bottom.score,
          },
        }),
      },
      currentDirection: mappedGame.currentDirection,
      ...(mappedGame.currentColor && { currentColor: mappedGame.currentColor }),
      ...(mappedGame.currentPlayer && { currentPlayer: mappedGame.currentPlayer }),
      ...(mappedGame.lastDrawnCard && { lastDrawnCard: mappedGame.lastDrawnCard }),
    };
  }

  /**
   * * Updates _gameState property-wise.
   * * Single point to modify _gameState.
   */
  updateGameStateProperties(mappedGameChanges: IMappedGameChanges): void {
    if (mappedGameChanges.currentColor) {
      this._gameState.currentColor = mappedGameChanges.currentColor;
      this._currentColorSubject$.next(this._gameState.currentColor);
    }
    if (mappedGameChanges.currentDirection) {
      this._gameState.currentDirection = mappedGameChanges.currentDirection;
      this._currentDirectionSubject$.next(this._gameState.currentDirection);
    }
    if (mappedGameChanges.currentPlayer) {
      this._gameState.currentPlayer = mappedGameChanges.currentPlayer;
      this._currentPlayerSubject$.next(this._gameState.currentPlayer);
    }
    if (mappedGameChanges.lastDrawnCard) {
      this._gameState.lastDrawnCard = mappedGameChanges.lastDrawnCard;
      this._lastDrawnCardIdSubject$.next(this._gameState.lastDrawnCard.id);
    }
  }

  emitIsMyTurn(isMyTurn: boolean = true): void {
    this._isMyTurnSubject$.next(isMyTurn);
  }

  emitIsNewCardPickable(isNewCardPickable: boolean = true): void {
    this._isNewCardPickableSubject$.next(isNewCardPickable);
  }

  emitIsMyTurnSkippable(isMyTurnSkippable: boolean = true): void {
    this._isMyTurnSkippableSubject$.next(isMyTurnSkippable);
  }

  emitFirstCardDiscardedEvent(card: ICard): void {
    this._firstCardDiscardedSubject$.next(card);
  }

  /**
   * Single point to fetch _gameState.
   */
  get gameState(): IClientGameState {
    return this._gameState;
  }

  private _createFreshOpponentCards(count: number): IOpponentCard[] {
    const opponentCards: IOpponentCard[] = Array.from({length: count}, (_, index) => { 
      return <IOpponentCard>{ index: index, state: OPPONENT_CARD_ANIMATION_ENUM.stationary }; 
    });
    return opponentCards;
  }

  /**
   * 1. Used to emit my cards in fresh-game-start and screen-refresh event.
   * 2. Sets 'isLegal' = false, and state = CARD_ANIMATION_ENUM.stationary
   */
  private _mapBottomCardsToDefaultState(cards: ICard[]): ICard[] {
    return cards.map(card => {
      return <ICard>{
        ...card,
        isLegal: false,
        state: CARD_ANIMATION_ENUM.stationary,
      };
    });
  }

  private _emitIsSocketConnectedToServer(isSocketConnectedToServer: boolean = true): void {
    this._isSocketConnectedToServerSubject$.next(isSocketConnectedToServer);
  }
}
