import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[card]'
})
export class CardDirective implements OnInit {

  @HostBinding('style.background') image: string;
  @HostBinding('style.backgroundRepeat') repeat: string = 'round';

  constructor() { }

  ngOnInit(): void {
    this.image = "url(./../assets/images/uno.jpeg)";
  }

}
