import { Component, OnInit } from '@angular/core';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  login() {
    this.modalService.open(LoginComponent, {size: 'lg'});
  }

  signUp() {
    this.modalService.open(SignUpComponent, {size: 'lg'});
  }


}
