import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModel} from '../model/auth.model';

@Injectable()
export class Authenticate {

  private url = 'http://212.47.239.128:8080/authenticate';
  private currentUserLocalStorage = 'currentUser';


  constructor(public http: HttpClient) {
  }

  public authenticate(usernameOrEmail: string, password: string) {
    return this.http.post(this.url, {
      usernameOrEmail: usernameOrEmail,
      password: password,
    });
  }

  public isLoggedIn() {
    const user = localStorage.getItem(this.currentUserLocalStorage);
    return user && user.length > 0;
  }

  public logOut() {
    return localStorage.removeItem(this.currentUserLocalStorage);
  }

  public storeTokenAndUser(authModel: AuthModel) {
    localStorage.setItem(this.currentUserLocalStorage, JSON.stringify(authModel));
  }

  public currentUser(): AuthModel {
    const currentUser = localStorage.getItem(this.currentUserLocalStorage);
    const user: AuthModel = JSON.parse(currentUser);
    return user;
  }

}
