// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']); // Navigate to dashboard upon successful login
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  }
}
