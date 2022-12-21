import { CARD_ANIMATION_ENUM, OPPONENT_CARD_ANIMATION_ENUM } from "../../enums/animation.enum";
import { CARD_TYPE } from "../../enums/websocket-enums/card-enums/card-types.enum";
import { INumberCard, IActionCard, IWildCard } from "./card-data.interface";

/**
 * Properties set to 'readonly' so that frontend cannot modify card data.
 */
export interface ICard {
  readonly id: string;
  readonly type: CARD_TYPE;
  readonly data: INumberCard | IActionCard | IWildCard;

  /**
   * REQUIRED in frontend
   */
  state: CARD_ANIMATION_ENUM,

  /**
   * REQUIRED in frontend
   */
  isLegal: boolean,
}

export interface IOpponentCard {
  index: number;
  id?: string;
  state: OPPONENT_CARD_ANIMATION_ENUM;
}