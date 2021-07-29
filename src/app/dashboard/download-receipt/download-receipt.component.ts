import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-download-receipt',
  templateUrl: './download-receipt.component.html',
  styleUrls: ['./download-receipt.component.scss']
})
export class DownloadReceiptComponent implements OnInit {
@Input() url:string | any;
linkDownload: Observable<string> | any;

constructor(private storage: AngularFireStorage) {
}

ngOnInit(): void {
  if (this.url) {
    const ref = this.storage.ref('images/' + this.url);
    this.linkDownload = ref.getDownloadURL();
  }
}

}
