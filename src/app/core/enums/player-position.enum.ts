export enum PLAYER_POSITION {
  left = 'left',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
};

export type PlayerYelledUnoPositionType = Exclude<PLAYER_POSITION, PLAYER_POSITION.bottom>;