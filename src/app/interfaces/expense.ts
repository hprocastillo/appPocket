import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Expense {
  id?: string;
  pocketId: string;
  expenseAmount: number;
  expenseName: string;
  expenseReceiptUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
