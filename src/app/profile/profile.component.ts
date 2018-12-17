import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Authenticate} from '../authentication/authenticate';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthModel} from '../model/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  private user: AuthModel;

  constructor(public authService: Authenticate, public activeModal: NgbActiveModal) {
    this.user = authService.currentUser();
  }

  ngOnInit() {

  }

}
