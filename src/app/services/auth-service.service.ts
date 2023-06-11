import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn: boolean = false
  // userSub = new Subject<User>();

  constructor(private http: HttpClient) { }

  checkAuthentication(){
    if(sessionStorage.getItem("isAuthenticated")){
      console.log('isAuthenticated')
    }
  }

  signUp(email: string, password: string): Observable<Task> {
    sessionStorage.setItem("isAuthenticated", 'true');
    return this.http.post<Task>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2Ae4kMBlCsh3_rxbRCmmZyTieaAZiS1E',
      { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler))
  }


  login(email: string, password: string): Observable<Task> {
    sessionStorage.setItem("isAuthenticated", 'true');
    return this.http.post<Task>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2Ae4kMBlCsh3_rxbRCmmZyTieaAZiS1E`,
      { email, password, returnSecureToken: true }).pipe(catchError(this.getErrorHandler))
  }

  getErrorHandler(errorRes: HttpErrorResponse): Observable<never> {
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


  // private handleUser(response: AuthResponseData) {
  //   const expireDate = new Date(new Date().getTime() + +response.expiresIn * 50000)
  //   const user = new User(
  //     response.email,
  //     response.localId,
  //     response.idToken,
  //     expireDate
  //   );
  //   this.userSub.next(user);
  // }
}
