import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameGuard } from '../core/guards/name.guard';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    data: { animation: "fromRight" },
  },
  {
    path: "lobby",
    component: LobbyComponent,
    canActivate: [NameGuard],
    data: { animation: "toLeft" },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
