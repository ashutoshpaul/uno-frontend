import { Injectable } from '@angular/core';
import { IDistributeCardsResponse, IUpdateSocketIdPayload } from '../interfaces/response.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { IdentityService } from './identity.service';
import { Observable, Subject } from 'rxjs';
import { ICard, IOpponentCard } from '../interfaces/card-interfaces/card.interface';
import { ICurrentPlayer } from '../interfaces/player.interface';
import { DIRECTION } from '../enums/direction.enum';
import { ValidColorCodeType } from '../enums/websocket-enums/card-enums/card-colors.enum';
import { PLAYER_POSITION } from '../enums/player-position.enum';
import { IMappedPlayers } from '../interfaces/mapped-players.interface';
import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from '../enums/animation.enum';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  readonly isShuffleCardsEventTriggered$ = new Subject<boolean>();

  private readonly _bottomCardsSubject$ = new Subject<ICard[]>();
  readonly bottomCards$: Observable<ICard[]> = this._bottomCardsSubject$.asObservable();

  private readonly _leftOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly leftOpponentCards$: Observable<IOpponentCard[]> = this._leftOpponentCardsSubject$.asObservable();

  private readonly _topOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly topOpponentCards$: Observable<IOpponentCard[]> = this._topOpponentCardsSubject$.asObservable();

  private readonly _rightOpponentCardsSubject$ = new Subject<IOpponentCard[]>();
  readonly rightOpponentCards$: Observable<IOpponentCard[]> = this._rightOpponentCardsSubject$.asObservable();
  
  private readonly _lastDrawnCardSubject$ = new Subject<ICard>();
  readonly lastDrawnCard$: Observable<ICard> = this._lastDrawnCardSubject$.asObservable();
  
  private readonly _currentPlayerSubject$ = new Subject<ICurrentPlayer>();
  readonly currentPlayer$: Observable<ICurrentPlayer> = this._currentPlayerSubject$.asObservable();

  private readonly _currentDirectionSubject$ = new Subject<DIRECTION>();
  readonly currentDirection$: Observable<DIRECTION> = this._currentDirectionSubject$.asObservable();

  private readonly _currentColorSubject$ = new Subject<ValidColorCodeType>();
  readonly currentColor$: Observable<ValidColorCodeType> = this._currentColorSubject$.asObservable();

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
        console.log('identity updated');
      });
    }
  }

  distributeCards(): void {
    console.log('distributeCards()');
    this._httpService.distributeCards(this._identityService.identity).subscribe(_ => {
      // DO NOT REMOVE .subscribe()
      
    });
  }

  toggleShuffleCardsEventTrigger(isTrigger: boolean = true): void {
    this.isShuffleCardsEventTriggered$.next(isTrigger);
  }

  /**
   * 1. Sets and emits fresh cards for a single player.
   * 2. Usecases: at game start and screen refresh.
   * 
   * @param position POSITION
   * @param cards 'ICard[]' for me and 'number' for opponents
   */
  setCardsForPlayer(position: PLAYER_POSITION, cards: ICard[] | number): void {
    let opponentCards: IOpponentCard[] = [];

    if (position != PLAYER_POSITION.bottom) {
      if(Array.isArray(cards)) return console.error('setCards() input arg cards is not a number!');
      opponentCards = this._createFreshOpponentCards(+cards);
    }

    switch (position) {
      case PLAYER_POSITION.bottom:
        Array.isArray(cards) && this._bottomCardsSubject$.next(this._mapBottomCardsToDefaultState(cards));
        break;
      case PLAYER_POSITION.left:
        this._leftOpponentCardsSubject$.next(opponentCards);
        break;
      case PLAYER_POSITION.top:
        this._leftOpponentCardsSubject$.next(opponentCards);
        break;
      case PLAYER_POSITION.right:
        this._leftOpponentCardsSubject$.next(opponentCards);
        break;
    }
  }

  /**
   * Sets (restores) current game state on new-game-start and page-refresh.
   */
  setGameState(mappedPlayers: IMappedPlayers): void {
    mappedPlayers.left && this._leftOpponentCardsSubject$.next(this._createFreshOpponentCards(mappedPlayers.left.cardsCount));
    mappedPlayers.top && this._topOpponentCardsSubject$.next(this._createFreshOpponentCards(mappedPlayers.top.cardsCount));
    mappedPlayers.right && this._rightOpponentCardsSubject$.next(this._createFreshOpponentCards(mappedPlayers.right.cardsCount));
    mappedPlayers.bottom && this._bottomCardsSubject$.next(this._mapBottomCardsToDefaultState(mappedPlayers.bottom.cards));
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
}
