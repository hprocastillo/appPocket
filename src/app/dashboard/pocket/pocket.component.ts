import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {PocketService} from "../../services/pocket.service";
import {Subject} from "rxjs";
import {Pocket} from "../../interfaces/pocket";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss']
})
export class PocketComponent implements OnInit, OnDestroy {
  today = new Date();
  monthDefaultName: string | any;
  monthDefaultValue: number = 0;
  monthSelectedValue: number = 0;

  nameMonths = [
    {value: 0, name: 'Enero'},
    {value: 1, name: 'Febrero'},
    {value: 2, name: 'Marzo'},
    {value: 3, name: 'Abril'},
    {value: 4, name: 'Mayo'},
    {value: 5, name: 'Junio'},
    {value: 6, name: 'Julio'},
    {value: 7, name: 'Agosto'},
    {value: 8, name: 'Septiembre'},
    {value: 9, name: 'Octubre'},
    {value: 10, name: 'Noviembre'},
    {value: 11, name: 'Diciembre'},
  ];

  pocketId: string | null = '';
  pocket = {} as Pocket;
  totalAmount: number | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private activatedRoute: ActivatedRoute, private pocketSvc: PocketService) {

    switch (this.today.getMonth()) {
      case 0:
        this.monthDefaultName = 'Enero';
        this.monthDefaultValue = 0;
        break;
      case 1:
        this.monthDefaultName = 'Febrero';
        this.monthDefaultValue = 1;
        break;
      case 2:
        this.monthDefaultName = 'Marzo';
        this.monthDefaultValue = 2;
        break;
      case 3:
        this.monthDefaultName = 'Abril';
        this.monthDefaultValue = 3;
        break;
      case 4:
        this.monthDefaultName = 'Mayo';
        this.monthDefaultValue = 4;
        break;
      case 5:
        this.monthDefaultName = 'Junio';
        this.monthDefaultValue = 5;
        break;
      case 6:
        this.monthDefaultName = 'Julio';
        this.monthDefaultValue = 6;
        break;
      case 7:
        this.monthDefaultName = 'Agosto';
        this.monthDefaultValue = 7;
        break;
      case 8:
        this.monthDefaultName = 'Septiembre';
        this.monthDefaultValue = 8;
        break;
      case 9:
        this.monthDefaultName = 'Octubre';
        this.monthDefaultValue = 9;
        break;
      case 10:
        this.monthDefaultName = 'Noviembre';
        this.monthDefaultValue = 10;
        break;
      case 11:
        this.monthDefaultName = 'Diciembre';
        this.monthDefaultValue = 11;
        break;
      default:
        break;
    }
    console.log(this.monthDefaultValue)

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.pocketId = params.get('id');
        if (this.pocketId) {
          this.pocketSvc.getPocketsById(this.pocketId)
            .pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
            (res: any) => {
              this.pocket = res;
            }
          );
        }
      }
    );
  }

  changeSelectedMonth(event: any) {
    this.monthSelectedValue = parseInt(event);
    console.log(this.monthSelectedValue)
  }

  getTotal(event: any) {
    this.totalAmount = event;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
