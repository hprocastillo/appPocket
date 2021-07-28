import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PocketComponent} from "./pocket/pocket.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'pocket/:id', component: PocketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
