import { CARD_TYPE } from "../../enums/websocket-enums/card-enums/card-types.enum";
import { INumberCard, IActionCard, IWildCard } from "./card-data.interface";

export interface ICard {
  id: string;
  type: CARD_TYPE;
  data: INumberCard | IActionCard | IWildCard;
}