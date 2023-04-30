import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/User';
import { AuthResponseData } from '../shared/AuthResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userSub = new Subject<User>();

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<Task>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtnShSRSygys2Z3XlKrAAAvo838v1q4T0',
      { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)))
  }


  login(email: string, password: string) {
    return this.http.post<Task>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtnShSRSygys2Z3XlKrAAAvo838v1q4T0`,
      { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)))
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'Invalid email or password'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(errorMessage)
  }


  private handleUser(response: AuthResponseData) {
    const expireDate = new Date(new Date().getTime() + +response.expiresIn * 50000)
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expireDate
    );
    this.userSub.next(user);
  }
}
