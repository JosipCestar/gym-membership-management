// AuthService
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  login(username: string, password: string): boolean {
    if (username === "admin" && password === "password") {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn); // Just for debugging
      return true; // Return true if login is successful
    } else {
      this.isLoggedIn = false;
      return false; // Return false if login fails
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
