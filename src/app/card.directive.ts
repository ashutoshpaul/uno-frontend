import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[card]'
})
export class CardDirective implements OnInit {

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    const unoCardFront = this._renderer.createElement('div');
    const unoCardBack = this._renderer.createElement('div');

    this._renderer.addClass(unoCardFront, 'uno-card-front');
    this._renderer.addClass(unoCardBack, 'uno-card-back');

    this._renderer.setStyle(unoCardFront, 'background', "url(./../assets/images/uno.jpeg)");
    this._renderer.setStyle(unoCardFront, 'backgroundRepeat', "round");

    this._renderer.appendChild(this._elementRef.nativeElement, unoCardFront);
    this._renderer.appendChild(this._elementRef.nativeElement, unoCardBack);
  }

}
