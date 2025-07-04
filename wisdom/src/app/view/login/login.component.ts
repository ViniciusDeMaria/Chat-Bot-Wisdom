import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private authService: AuthService, private router: Router){}

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  singIn = false;

  onLogin(): void {
    this.router.navigate(['/chat']);

    // this.authService.login(this.email, this.password).subscribe((user) => {

    //   },
    //   (error) => {
    //     this.errorMessage = error;
    // });
  }

  changeForSingUp() {
    this.singIn = true;
  }

  onSignUp(): void {
    this.router.navigate(['/chat']);
    // this.authService.signUp(this.email, this.password).subscribe((user) => {

    //   },
    //   (error) => {
    //     this.errorMessage = error;
    // });
  }

  changeForLogin() {
    this.singIn = false;
  }
}
