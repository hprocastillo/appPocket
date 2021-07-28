import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MaterialModule} from "../material.module";
import {ListPocketsComponent} from './list-pockets/list-pockets.component';
import {NewPocketComponent} from './new-pocket/new-pocket.component';
import {DeleteConfirmComponent} from './delete-confirm/delete-confirm.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PocketComponent } from './pocket/pocket.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListPocketsComponent,
    NewPocketComponent,
    DeleteConfirmComponent,
    PocketComponent,
    ListExpensesComponent,
    NewExpenseComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class DashboardModule {
}
