import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appPocket';
  showFiller = false;

  constructor(public authSvc: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async logout() {
    try {
      await this.authSvc.logout();
      await this.router.navigate(['login']);
      console.log('You are logout');
    } catch (err) {
      console.log(err);
    }
  }

}
