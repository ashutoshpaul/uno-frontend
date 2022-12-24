import { Attribute, Directive, HostBinding, Input, OnChanges, OnInit } from '@angular/core';

/**
 * * Sets all clickable elements to true.
 * * Sets all elements that should NOT be clicked by player to false.
 * * Elements that can/cannot be clicked is toggled accordingly.
 * 
 * @isClickable Input() makes element clickable/non-clickable based on input. Dynamic in nature.
 * Usecase: my-cards an be clicked at my turn and set to non-clickable on opponent's turn.
 * @isPermanentlyClickable Attribute() makes element PERMANENTLY clickable/non-clickable based on input.
 * Ones set cannot be changed. Usecase: opponent-cards are always non-clickable for me.
 * 
 * Note:
 * 1. If both are used at the same time, then 'isClickable' rules over 'isPermanentlyClickable'.
 * 2. If no value passed then element will NOT be clickable.
 */
@Directive({
  selector: '[appToggleClickability]'
})
export class ToggleClickabilityDirective implements OnChanges, OnInit {

  @Input() isClickable: boolean = false;

  @HostBinding('style.pointer-events') private _isClickEnabled = 'unset';

  constructor(
    @Attribute('isPermanentlyClickable') isPermanentlyClickable: 'true' | 'false',
  ) {
    if (isPermanentlyClickable != null) this.isClickable = (isPermanentlyClickable == 'true') ? true : false;
  }

  ngOnChanges(): void {
    if (this.isClickable) this._isClickEnabled = 'unset';
    else this._isClickEnabled = 'none';
  }

  // for binding input from 'isPermanentlyClickable'
  ngOnInit(): void {
    if (this.isClickable) this._isClickEnabled = 'unset';
    else this._isClickEnabled = 'none';
  }

}
