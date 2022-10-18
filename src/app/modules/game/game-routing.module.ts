import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExitGuard } from 'src/app/core/guards/exit.guard';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: "",
    component: GameComponent,
    canDeactivate: [ ExitGuard ],
    data: { animation: "game" },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
