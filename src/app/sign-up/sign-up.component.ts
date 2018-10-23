import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../model/user.model';
import {UserService} from '../service/user.service';
import {Authenticate} from '../authentication/authenticate';
import {AuthModel} from '../model/auth.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  formBuilder: FormBuilder;
  contactingServer = false;
  userNameAlreadyTaken = false;
  failedToSignUp = false;
  emailAlreadyTaken = false;
  message: string;

  constructor(public userService: UserService, private auth: Authenticate, public activeModal: NgbActiveModal, fb: FormBuilder) {
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]+'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUpUser() {
    let validForm = true;
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (!control.valid) {
        validForm = false;
      }
    });
    if (validForm) {
      const user: UserModel = new UserModel();
      const formData = this.form.value;
      user.name = formData.name;
      user.email = formData.email;
      user.username = formData.username;
      user.password = formData.password;
      this.contactingServer = true;
      // First check if there's any user with the given email.
      this.userService.getUserByEmail(user.email).subscribe((emailResponse: Response) => {
        // If everything OK with email, check for username.
        this.userService.getUserByUsername(user.username).subscribe((usernameResponse: Response) => {
          // If everything OK with username try to Sign up.
          this.userService.signUp(user).subscribe((signUpResponse: Response) => {
            // TODO: Perform a login automatically.
            this.contactingServer = false;
            this.failedToSignUp = false;
            this.userNameAlreadyTaken = false;
            this.emailAlreadyTaken = false;
            this.auth.authenticate(user.username, user.password).subscribe((authModel: AuthModel) => {
              this.auth.storeTokenAndUser(authModel);
              window.location.replace('');
            });
          }, error => {
            // Error when trying to sign up.
            this.failedToSignUp = !this.failedToSignUp;
            this.message = 'Something went wrong when trying to sign up. Please try again later';
            console.log('Error = ', error);
            this.contactingServer = false;
          });
        }, error => {
          // Notify that the given username is already taken!
          this.userNameAlreadyTaken = true;
          this.message = `Username: ${user.username} already taken. Please try another one.`;
          console.log('Error = ', error);
          this.contactingServer = false;
        });
      }, error => {
        // Notify that the email is already taken.
        this.emailAlreadyTaken = true;
        this.message = `Email: ${user.email} already taken. Please use another email.`;
        console.log('Error = ', error);
        this.contactingServer = false;
      });
    }
  }

}
