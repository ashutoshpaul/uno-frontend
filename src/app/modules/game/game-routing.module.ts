import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnoBoardComponent } from './uno-board/uno-board.component';

const routes: Routes = [
  {
    path: "",
    component: UnoBoardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
