import {Component, Input, OnDestroy, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {ExpenseService} from "../../services/expense.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Expense} from "../../interfaces/expense";
import {DeleteConfirmComponent} from "../delete-confirm/delete-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() user = {} as User;
  @Input() pocketId: string | any;
  @Input() monthDefaultValue: number | any;
  @Input() monthSelectedValue: number | any;

  listExpenses: Expense[] = [];
  @Output() totalAmount = new EventEmitter<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(private expenseSvc: ExpenseService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    if (this.monthDefaultValue) {
      this.expenseSvc.getExpensesByPocketId(this.pocketId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        res => {
          this.listExpenses = res;
          this.listExpenses = this.listExpenses.filter(item => {
            return item.createdAt.toDate().getMonth() === this.monthDefaultValue;
          });

          let count: number = 0;
          let sum: number = 0;
          if (count === 0) {
            for (let i: number = 0; i < this.listExpenses.length; i++) {
              sum = sum + this.listExpenses[i].expenseAmount;
            }
            count++;
          }
          this.totalAmount.emit(sum.toString());
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.monthSelectedValue) {
      this.expenseSvc.getExpensesByPocketId(this.pocketId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        res => {
          this.listExpenses = res;
          this.listExpenses = this.listExpenses.filter(item => {
            return item.createdAt.toDate().getMonth() === this.monthSelectedValue;
          });

          let count: number = 0;
          let sum: number = 0;
          if (count === 0) {
            for (let i: number = 0; i < this.listExpenses.length; i++) {
              sum = sum + this.listExpenses[i].expenseAmount;
            }
            count++;
          }
          this.totalAmount.emit(sum.toString());
        }
      );
    }
  }

  onDialogDelete(expenseId: string | any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        message: 'Desea borrar el Bolsillo?',
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.expenseSvc.deleteExpense(expenseId).then(r => r);
      }
    })
  }

  goExpense(expenseId: string | any) {
    // this.router.navigate(['dashboard/pocket/' + pocketId]).then(r => r).catch(err => console.log(err));
  }

  onEdit(expenseId: string | any) {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
