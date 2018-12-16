import {Component, OnInit} from '@angular/core';
import {Authenticate} from '../authentication/authenticate';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth: Authenticate, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  performLogOut() {
    this.auth.logOut();
    window.location.replace('');
  }

  viewProfile() {
    this.modalService.open(ProfileComponent, {size: 'lg'});
  }

}
