import { Directive, Input } from '@angular/core';
import { PLAYER_POSITION } from '../enums/player-position.enum';

@Directive({
  selector: '[appCardDisplacementCoordinate]',
  exportAs: 'appCardDisplacementCoordinate',
})
export class CardDisplacementCoordinateDirective {

  @Input() position: PLAYER_POSITION;

  constructor() { }

  destinationOfDiscardPileYPosition(cardIndex?: number): number {
    // 1rem = 16px (1.5rem = 24px)
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().bottom;
    if (this.position === PLAYER_POSITION.bottom) {
      const cardBottomGap: number = dashboardHeight - document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().bottom;
      const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap + 24 + 5;
      return -1 * destinationYPosition;
    } else if (this.position === PLAYER_POSITION.top) {
      const cardBottomGap: number = dashboardHeight - document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().bottom;
      const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardBottomGap + 16;
      return -1 * destinationYPosition;
    } else if (this.position === PLAYER_POSITION.left) {
      const cardLeftGap: number = dashboardWidth - document.getElementById(`left-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap + 16;
      return -1 * destinationXPosition;
    } else if (this.position === PLAYER_POSITION.right) {
      const cardLeftGap: number = dashboardWidth - document.getElementById(`right-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
      return destinationXPosition;
    }
  }

  destinationOfDiscardPileXPosition(cardIndex?: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const discardPileYPosition: number = document.getElementById("discard-pile").getBoundingClientRect().top;
    const dashboardWidth: number = document.getElementById("dashboard").getBoundingClientRect().width;
    const discardPileXPosition: number = document.getElementById("discard-pile").getBoundingClientRect().left;
    if (this.position === PLAYER_POSITION.bottom) {
      const cardLeftGap: number = dashboardWidth - document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().left;
      const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap + 5;
      return destinationXPosition;
    } else if (this.position === PLAYER_POSITION.top) {
      const cardLeftGap: number = dashboardWidth - document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      const destinationXPosition: number = dashboardWidth - discardPileXPosition - cardLeftGap;
      return -1 * destinationXPosition;
    } else if (this.position === PLAYER_POSITION.left) {
      const cardTopGap: number = dashboardHeight - document.getElementById(`left-player-uno-card-${cardIndex}`).getBoundingClientRect().top;
      const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardTopGap - 24;
      return destinationYPosition;
    } else if (this.position === PLAYER_POSITION.right) {
      const cardTopGap: number = dashboardHeight - document.getElementById(`right-player-uno-card-${cardIndex}`).getBoundingClientRect().top;
      const destinationYPosition: number = dashboardHeight - discardPileYPosition - cardTopGap - 16;
      return -1 * destinationYPosition;
    }
  }

  originOfCardYPosition(cardIndex?: number): number {
    const dashboardHeight: number = document.getElementById("dashboard").getBoundingClientRect().height;
    const drawerDeckYPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().bottom;
    if (this.position === PLAYER_POSITION.bottom) {
      const originOfCardY: number = dashboardHeight - drawerDeckYPosition - 44;
      return -1 * originOfCardY;
    } else if (this.position === PLAYER_POSITION.top) {
      const originOfCardY: number = dashboardHeight - drawerDeckYPosition - 1 * 16;
      return originOfCardY;
    } else if (this.position === PLAYER_POSITION.left) {
      const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
      const cardXPosition: number = document.getElementById(`left-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      return drawerDeckXPosition - cardXPosition - 16;
    } else if (this.position === PLAYER_POSITION.right) {
      const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
      const cardXPosition: number = document.getElementById(`right-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      return -1 * (drawerDeckXPosition - cardXPosition);
    }
  }

  originOfCardXPosition(cardIndex?: number): number {
    const drawerDeckYPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().top;
    const drawerDeckXPosition: number = document.getElementById("drawer-deck").getBoundingClientRect().left;
    if (this.position === PLAYER_POSITION.bottom) {
      const cardXPosition: number = document.getElementById(`uno-card-${cardIndex}`).getBoundingClientRect().left;
      const originOfCardXPosition: number = drawerDeckXPosition - cardXPosition;
      return originOfCardXPosition;
    } else if (this.position === PLAYER_POSITION.top) {
      const cardXPosition: number = document.getElementById(`front-player-uno-card-${cardIndex}`).getBoundingClientRect().left;
      const originOfCardXPosition: number = drawerDeckXPosition - cardXPosition;
      return originOfCardXPosition;
    } else if (this.position === PLAYER_POSITION.left) {
      const cardXPosition: number = document.getElementById(`left-player-uno-card-${cardIndex}`).getBoundingClientRect().top;
      const originOfCardXPosition: number = drawerDeckYPosition - cardXPosition + 24;
      return -1 * originOfCardXPosition;
    } else if (this.position === PLAYER_POSITION.right) {
      const cardXPosition: number = document.getElementById(`right-player-uno-card-${cardIndex}`).getBoundingClientRect().top;
      const originOfCardXPosition: number = drawerDeckYPosition - cardXPosition + 16;
      return originOfCardXPosition;
    }
  }

}
