import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Authenticate} from '../authentication/authenticate';
import {AuthModel} from '../model/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formBuilder: FormBuilder;
  contactingServer = false;
  error = false;
  errorMessage: string;

  constructor(public authService: Authenticate, public activeModal: NgbActiveModal, fb: FormBuilder) {
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      usernameOrEmail: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  login() {
    const formData = this.form.value;
    const userNameOrEmail = formData.usernameOrEmail;
    const password = formData.password;
    this.authService.authenticate(userNameOrEmail, password).subscribe((response: AuthModel) => {
      this.authService.storeTokenAndUser(response);
      window.location.replace('');
    }, error => {
      this.error = true;
      this.errorMessage = 'Unknown username/email or password';
    });
  }

}
