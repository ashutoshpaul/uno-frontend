import { ValidColorCodeType, COLOR_CODE } from "../../enums/websocket-enums/card-enums/card-colors.enum";
import { NumberCardPointsType, ActionCardPointsType, WildCardPointsType } from "../../enums/websocket-enums/card-enums/card-points.enum";
import { CARD_NUMBER, CARD_ACTION, CARD_WILD } from "../../enums/websocket-enums/card-enums/card-types.enum";

/**
 * Properties set to 'readonly' so that frontend cannot modify card data.
 */
export interface INumberCard {
  readonly number: CARD_NUMBER;
  readonly points: NumberCardPointsType;
  readonly color: ValidColorCodeType;
}

/**
 * Properties set to 'readonly' so that frontend cannot modify card data.
 */
export interface IActionCard {
  readonly action: CARD_ACTION;
  readonly points: ActionCardPointsType;
  readonly color: ValidColorCodeType;
}

/**
 * Properties set to 'readonly' so that frontend cannot modify card data.
 */
export interface IWildCard {
  readonly wild: CARD_WILD;
  readonly points: WildCardPointsType;
  readonly color: COLOR_CODE.black;
}