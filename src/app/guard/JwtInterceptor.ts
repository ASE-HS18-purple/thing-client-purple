import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Authenticate} from '../authentication/authenticate';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: Authenticate) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      const currentUser = this.auth.currentUser();
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        }
      });
    }
    return next.handle(req);
  }


}
