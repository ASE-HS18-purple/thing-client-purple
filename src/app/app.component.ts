import {Component} from '@angular/core';
import {Authenticate} from './authentication/authenticate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLoggedIn: boolean;

  constructor(private authService: Authenticate) {
    this.isLoggedIn = authService.isLoggedIn();
  }

}
