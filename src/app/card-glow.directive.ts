import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCardGlow]'
})
export class CardGlowDirective implements OnChanges {

  @Input() color: "black" | "blue" | "green" | "red" | "yellow";
  @Input() isLegal: boolean = false;

  constructor() {}

  @HostBinding('style.boxShadow') boxShadow: string;

  ngOnChanges(): void {
    if (this.isLegal) {
      switch(this.color) {
        case "black":
          this.boxShadow = "0px 0px 12px 10px rgba(0,0,0,0.59)";
          break;
        case "blue":
          this.boxShadow = "0px 0px 12px 10px rgba(0,13,255,0.59)";
          break;
        case "green":
          this.boxShadow = "0px 0px 12px 10px rgba(0,255,17,0.59)";
          break;
        case "red":
          this.boxShadow = "0px 0px 12px 10px rgba(255,0,0,0.59)";
          break;
        case "yellow":
          this.boxShadow = "0px 0px 12px 10px rgba(255,234,0,0.59)";
          break;
        default:
          this.boxShadow = "none";
      }
    } else {
      this.boxShadow = "none";
    }
  }

}
