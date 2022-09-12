import { AfterViewChecked, Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMarginLeft]'
})
export class MarginLeftDirective implements AfterViewChecked {

  @HostBinding('style.margin-left') marginLeft = 
  'clamp(-4rem, -2rem, -4rem)';

  constructor() { }

  ngAfterViewChecked(): void {
    console.log(document.getElementsByClassName('pile-container'));
    console.log(document.getElementsByClassName('card').length);
    console.log('HIII');
  }

}
