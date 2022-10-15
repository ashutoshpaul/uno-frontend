import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: "play",
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
