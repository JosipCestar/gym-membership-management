import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './auth.guard';
import { Router,NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthGuard]
})
export class AppComponent {
  title: string = "gyme";
  isLoginPage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}