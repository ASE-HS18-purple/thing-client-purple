import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/user.model';

@Injectable()
export class UserService {

  private baseURI = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {
  }

  public getUserByEmail(email: string) {
    return this.httpClient.get(this.baseURI + '/email/' + email);
  }

  public getUserByUsername(username: string) {
    return this.httpClient.get(this.baseURI + '/username/' + username);
  }

  public signUp(user: UserModel) {
    return this.httpClient.post(this.baseURI, user);
  }

}
