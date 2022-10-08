import { Directive, Input, OnChanges, HostBinding } from '@angular/core';
import { COLOR_CODE_ENUM, VALID_COLOR_CODE } from './core/enums/color-code.enum';

@Directive({
  selector: '[appCurrentColor]'
})
export class CurrentColorDirective implements OnChanges {

  @Input() color: VALID_COLOR_CODE;

  @HostBinding('style.borderBottom') borderBottom: string;

  constructor() { }

  ngOnChanges(): void {
    switch(this.color) {
      case COLOR_CODE_ENUM.blue:
        this.borderBottom = "0.4rem double blue";
        break;
      case COLOR_CODE_ENUM.green:
        this.borderBottom = "0.4rem double green";
        break;
      case COLOR_CODE_ENUM.red:
        this.borderBottom = "0.4rem double red";
        break;
      case COLOR_CODE_ENUM.yellow:
        this.borderBottom = "0.4rem double gold";
        break;
      default:
        this.borderBottom = "none";

    }
  }

}
