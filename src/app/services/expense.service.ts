import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Expense} from "../interfaces/expense";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Pocket} from "../interfaces/pocket";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenses: Observable<Expense[]>;
  expensesCollection: AngularFirestoreCollection<Expense>;

  constructor(private readonly afs: AngularFirestore) {
    this.expensesCollection = afs.collection<Expense>('expenses', ref => ref.orderBy('createdAt', 'desc'));
    this.expenses = this.expensesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Expense;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getExpenseById(expenseId: string) {
    return this.afs.collection<Expense>('expenses').doc(expenseId).valueChanges();
  }

  getExpensesByUserId(userId: string) {
    return this.afs.collection<Expense>('expenses', ref => ref.where('userId', '==', userId)
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Expense;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getExpensesByPocketId(pocketId: string) {
    return this.afs.collection<Expense>('expenses', ref => ref.where('pocketId', '==', pocketId)
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Expense;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveExpense(expense: Expense, expenseId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = expenseId || this.afs.createId();
        const data = {id, ...expense};
        const result = await this.expensesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getExpenses() {
    return this.expenses;
  }

  deleteExpense(expenseId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.expensesCollection.doc(expenseId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
