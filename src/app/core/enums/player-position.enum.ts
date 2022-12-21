export enum PLAYER_POSITION {
  left = 'left',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
};

export type UnoPositionType = Exclude<PLAYER_POSITION, PLAYER_POSITION.bottom>;