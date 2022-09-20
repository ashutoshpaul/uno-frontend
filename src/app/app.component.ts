import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('addToDiscard', [
      state('begin', style({
        // width: "5rem",
      })),
      state('end', style({
        top: "{{yPosition}}px",
        right: "{{xPosition}}px",
        display: "none",
      }), {
        params: { xPosition: 0, yPosition: 0 },
      }),
      transition('begin => end', [
        animate('0.4s ease-in-out'),
      ]),
    ]),
  ]
})
export class AppComponent {
  readonly cards: { isSentToDiscard: boolean }[] = [
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
    { isSentToDiscard: false },
  ];
  
  isSentToDiscard: boolean = false;

  clickCard(cardIndex: number): void {
    this.cards[cardIndex].isSentToDiscard = !this.cards[cardIndex].isSentToDiscard;
  }

  destinationOfDiscardPileYPosition(cardIndex: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    const cardBottomGap: number = dashboardHeight - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().bottom;
    const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap;
    return destinationYPosition;
  }

  destinationOfDiscardPileXPosition(cardIndex: number): number {
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const cardLeftGap: number = dashboardWidth - document.getElementById(`card-${cardIndex}`).getBoundingClientRect().left;
    const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
    return destinationXPosition;
  }
}
