import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { User } from '../users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  activeUsers: number = 0;
  totalProfit: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.totalUsers = users.length;
      this.activeUsers = users.filter(user => this.isUserActive(user.date)).length;
      this.totalProfit = this.calculateTotalProfit(users);
    });
  }

  isUserActive(userDate: string): boolean {
    return new Date(userDate) >= new Date();
  }

  calculateTotalProfit(users: User[]): number {
    return users.reduce((total, user) => {
      return total + (user.plan === 'Standard' ? 20 : 30);
    }, 0);
  }
}
