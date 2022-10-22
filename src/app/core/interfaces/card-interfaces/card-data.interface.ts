import { ValidColorCodeType, COLOR_CODE } from "../../enums/websocket-enums/card-enums/card-colors.enum";
import { NumberCardPointsType, ActionCardPointsType, WildCardPointsType } from "../../enums/websocket-enums/card-enums/card-points.enum";
import { CARD_NUMBER, CARD_ACTION, CARD_WILD } from "../../enums/websocket-enums/card-enums/card-types.enum";

export interface INumberCard {
  number: CARD_NUMBER;
  points: NumberCardPointsType;
  color: ValidColorCodeType;
}

export interface IActionCard {
  action: CARD_ACTION;
  points: ActionCardPointsType;
  color: ValidColorCodeType;
}

export interface IWildCard {
  wild: CARD_WILD;
  points: WildCardPointsType;
  readonly color: COLOR_CODE.black;
}