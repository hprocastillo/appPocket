import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Pocket {
  id?: string;
  pocketName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
