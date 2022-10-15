import { Directive, Input, OnChanges, HostBinding } from '@angular/core';
import { VALID_COLOR_CODE, COLOR_CODE_ENUM } from '../enums/color-code.enum';

@Directive({
  selector: '[appCurrentColor]'
})
export class CurrentColorDirective implements OnChanges {

  @Input() color: VALID_COLOR_CODE;
  @Input() position: 'top' | 'bottom' = 'bottom';

  @HostBinding('style.borderImage') borderImage: string;

  constructor() { }

  ngOnChanges(): void {
    switch(this.color) {
      case COLOR_CODE_ENUM.blue:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, blue, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, blue, transparent) 1";
        break;
      case COLOR_CODE_ENUM.green:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, rgb(8, 240, 0), transparent, transparent) 1"
        : "linear-gradient(to right, transparent, rgb(8, 240, 0), transparent) 1";
        break;
      case COLOR_CODE_ENUM.red:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, red, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, red, transparent) 1";
        break;
      case COLOR_CODE_ENUM.yellow:
        this.borderImage = this.position == 'bottom'
        ? "linear-gradient(to right, transparent, transparent, gold, transparent, transparent) 1"
        : "linear-gradient(to right, transparent, gold, transparent) 1";
        break;
      default:
        this.borderImage = "linear-gradient(to right, transparent, transparent) 1";
    }
  }

}
