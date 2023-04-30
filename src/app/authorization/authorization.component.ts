import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../shared/Task';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  isLoginMode: boolean = false;
  // isLoading: boolean = false;
  error: string = '';

  constructor(private router: Router, private authService: AuthServiceService){}

  onFormSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    // this.isLoading = true;
    this.error = '';

    let authObs: Observable<Task>

    if (this.isLoginMode) {
      authObs = this.authService.login(authForm.value.email, authForm.value.password);
    } else {
      authObs = this.authService.signUp(authForm.value.email, authForm.value.password);
    }
    authObs.subscribe(response => {
      this.router.navigate(['home']);
    },
      (errorMessage) => {
        this.error = errorMessage
        console.log(errorMessage.error.error.message)
      }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}

