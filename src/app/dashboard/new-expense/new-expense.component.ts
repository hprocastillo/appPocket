import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PocketService} from "../../services/pocket.service";
import {ExpenseService} from "../../services/expense.service";

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  showExpenseForm = false;
  today = new Date();
  @Input() pocketId: string | any;
  @Input() user = {} as User;
  newExpenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseSvc: ExpenseService) {
    this.newExpenseForm = this.fb.group({
      expenseName: ['', [Validators.required]],
      expenseAmount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  showForm() {
    this.showExpenseForm = true;
  }

  hideForm() {
    this.showExpenseForm = false;
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newExpenseForm.valid) {
      const expense = this.newExpenseForm.value;
      const expenseId = expense?.id || null;
      expense.pocketId = this.pocketId;
      expense.userId = userId;
      expense.userDisplayName = userDisplayName;
      expense.userEmail = userEmail;
      expense.userPhotoUrl = userPhotoUrl;
      expense.createdAt = this.today;
      this.expenseSvc.saveExpense(expense, expenseId).then(r => r).catch(err => console.log(err));
      this.newExpenseForm.reset();
      this.showExpenseForm = false;
    }
  }

}
