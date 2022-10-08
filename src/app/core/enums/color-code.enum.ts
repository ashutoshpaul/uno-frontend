export enum COLOR_CODE_ENUM {
    black = 'black',
    blue = 'blue',
    green = 'green',
    red = 'red',
    yellow = 'yellow',
}

export type VALID_COLOR_CODE = Omit<COLOR_CODE_ENUM, COLOR_CODE_ENUM.black>;