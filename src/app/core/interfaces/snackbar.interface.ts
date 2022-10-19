import { SNACKBAR_EVENT } from "../enums/snackbar.enum";

export interface ISnackbar {
  event: SNACKBAR_EVENT,
  additional?: {
    playerName: string;
    removedPlayerName: string;
  }
}