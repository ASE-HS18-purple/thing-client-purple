import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user.model';
import {AuthModel} from '../model/auth.model';
import {Authenticate} from '../authentication/authenticate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private currentUser: AuthModel;

  constructor(private authService: Authenticate) {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit() {
  }

}
