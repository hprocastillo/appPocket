import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../services/expense.service";
import {AngularFireStorage} from '@angular/fire/storage';

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
  nameRandom: string = '';

  constructor(private fb: FormBuilder, private expenseSvc: ExpenseService, private storage: AngularFireStorage) {
    this.newExpenseForm = this.fb.group({
      expenseName: ['', [Validators.required]],
      expenseAmount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const characters = 'AbCdEfGhIjKmNlOpQrStUvWxYz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      this.nameRandom += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const file = event.target.files[0];
    const filePath = 'images/' + this.nameRandom;
    const task = this.storage.upload(filePath, file);
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
      expense.expenseReceiptUrl = this.nameRandom;
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
