import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[card]'
})
export class CardDirective implements OnChanges, OnInit {

  @Input() cardType: "player" | "opponent" = "player";
  @Input() cardId: string;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef,
  ) { }

  ngOnChanges(): void {
    this._performAction();
  }

  /**
   * For cards that dont provide any input. Eg.: shuffle-cards, etc.
   */
  ngOnInit(): void {
    this._performAction();
  }

  private _performAction(): void {
    const unoCardFront = this._renderer.createElement('div');
    const unoCardBack = this._renderer.createElement('div');

    this._renderer.addClass(unoCardFront, 'uno-card-front');
    this._renderer.addClass(unoCardBack, 'uno-card-back');

    if(this.cardType == "player") {
      if (this.cardId) {
        this._renderer.setStyle(unoCardFront, 'background', "url(./../assets/images/uno-cards/"+this.cardId+".png)");
      } else {
        this._renderer.setStyle(unoCardFront, 'background', "yellow");
      }
    } else if(this.cardType == "opponent") {
      this._renderer.setStyle(unoCardFront, 'background', "yellow");
      this._renderer.setStyle(this._elementRef.nativeElement, 'transform', "rotateY(180deg) rotateZ(-180deg)");
    }

    this._renderer.setStyle(unoCardFront, 'backgroundRepeat', "round");

    this._renderer.appendChild(this._elementRef.nativeElement, unoCardFront);
    this._renderer.appendChild(this._elementRef.nativeElement, unoCardBack);
  }
}
