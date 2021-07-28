import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {Pocket} from "../../interfaces/pocket";
import {Subject} from "rxjs";
import {PocketService} from "../../services/pocket.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {DeleteConfirmComponent} from "../delete-confirm/delete-confirm.component";

@Component({
  selector: 'app-list-pockets',
  templateUrl: './list-pockets.component.html',
  styleUrls: ['./list-pockets.component.scss']
})
export class ListPocketsComponent implements OnInit, OnDestroy {

  @Input() user = {} as User;
  listPocket: Pocket[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private pocketSvc: PocketService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.pocketSvc.getPocketsByUserId(this.user.uid)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      res => {
        this.listPocket = res;
      }
    );
  }

  goPocket(pocketId: string | any) {
    this.router.navigate(['dashboard/pocket/' + pocketId]).then(r => r).catch(err => console.log(err));
  }

  onDialogDelete(pocketId: string | any) {
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
        this.pocketSvc.deletePocket(pocketId).then(r => r);
      }
    })
  }

  onEdit(pocketId: string | any) {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
