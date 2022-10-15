import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[card]'
})
export class CardDirective implements OnInit {

  @Input() cardType: "player" | "opponent" = "player";

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    const unoCardFront = this._renderer.createElement('div');
    const unoCardBack = this._renderer.createElement('div');

    this._renderer.addClass(unoCardFront, 'uno-card-front');
    this._renderer.addClass(unoCardBack, 'uno-card-back');

    if(this.cardType == "player") {
      this._renderer.setStyle(unoCardFront, 'background', "url(./../assets/images/uno.jpeg)");
    } else if(this.cardType == "opponent") {
      this._renderer.setStyle(unoCardFront, 'background', "yellow");
      this._renderer.setStyle(this._elementRef.nativeElement, 'transform', "rotateY(180deg) rotateZ(-180deg)");
    }

    this._renderer.setStyle(unoCardFront, 'backgroundRepeat', "round");

    this._renderer.appendChild(this._elementRef.nativeElement, unoCardFront);
    this._renderer.appendChild(this._elementRef.nativeElement, unoCardBack);

  }

}
