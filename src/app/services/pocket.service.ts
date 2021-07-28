import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Pocket} from "../interfaces/pocket";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PocketService {
  pockets: Observable<Pocket[]>;
  pocketsCollection: AngularFirestoreCollection<Pocket>;

  constructor(private readonly afs: AngularFirestore) {
    this.pocketsCollection = afs.collection<Pocket>('pockets', ref => ref.orderBy('createdAt', 'desc'));
    this.pockets = this.pocketsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Pocket;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getPocketsById(pocketId: string) {
    return this.afs.collection<Pocket>('pockets').doc(pocketId).valueChanges();
  }

  getPocketsByUserId(userId: string) {
    return this.afs.collection<Pocket>('pockets', ref => ref.where('userId', '==', userId)
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Pocket;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  savePocket(pocket: Pocket, pocketId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = pocketId || this.afs.createId();
        const data = {id, ...pocket};
        const result = await this.pocketsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getPockets() {
    return this.pockets;
  }

  deletePocket(pocketId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.pocketsCollection.doc(pocketId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
