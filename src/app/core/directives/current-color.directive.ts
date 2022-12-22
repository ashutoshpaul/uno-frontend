import { Directive, Input, OnChanges, HostBinding } from '@angular/core';
import { COLOR_CODE, ValidColorCodeType } from '../enums/websocket-enums/card-enums/card-colors.enum';

@Directive({
  selector: '[appCurrentColor]'
})
export class CurrentColorDirective implements OnChanges {

  @Input() color: ValidColorCodeType;
  @Input() position: 'top' | 'bottom' = 'bottom';

  @HostBinding('style.borderImage') borderImage: string;

  constructor() { }

  ngOnChanges(): void {
    switch(this.color) {
      case COLOR_CODE.blue:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, blue, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, blue, transparent) 1";
        break;
      case COLOR_CODE.green:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, rgb(8, 240, 0), transparent, transparent) 1"
        : "linear-gradient(to right, transparent, rgb(8, 240, 0), transparent) 1";
        break;
      case COLOR_CODE.red:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, red, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, red, transparent) 1";
        break;
      case COLOR_CODE.yellow:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, gold, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, gold, transparent) 1";
        break;
      default:
        this.borderImage = "linear-gradient(to right, transparent, transparent) 1";
    }
  }

}
