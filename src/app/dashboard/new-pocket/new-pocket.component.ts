import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PocketService} from "../../services/pocket.service";

@Component({
  selector: 'app-new-pocket',
  templateUrl: './new-pocket.component.html',
  styleUrls: ['./new-pocket.component.scss']
})
export class NewPocketComponent implements OnInit {
  today = new Date();
  @Input() user = {} as User;
  newPocketForm: FormGroup;

  constructor(private fb: FormBuilder, private pocketSvc: PocketService) {
    this.newPocketForm = this.fb.group({
      pocketName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newPocketForm.valid) {
      const pocket = this.newPocketForm.value;
      const pocketId = pocket?.id || null;
      pocket.userId = userId;
      pocket.userDisplayName = userDisplayName;
      pocket.userEmail = userEmail;
      pocket.userPhotoUrl = userPhotoUrl;
      pocket.createdAt = this.today;
      this.pocketSvc.savePocket(pocket, pocketId).then(r => r).catch(err => console.log(err));
      this.newPocketForm.reset();
    }
  }

}
