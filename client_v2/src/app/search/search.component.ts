import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../users.service';
import { User } from '../users.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone:true,
  imports:[FormsModule,CommonModule],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  filteredUsers: User[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.filteredUsers = users;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredUsers = this.userService.users().filter(user => {
      const fullName = `${user.name} ${user.surname}`.toLowerCase();
      const pin = user.PIN.toString();
      return fullName.includes(query) || pin.includes(query);
    });
  }

  isUserActive(userDate: string): boolean {
    return new Date(userDate) >= new Date();
  }

  renewUser(user: User): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to renew this user?';
  
    modalRef.result.then((result) => {
      if (result === 'confirmed') {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        user.date = currentDate.toISOString();
        this.userService.updateUser(user).subscribe(() => {
          console.log('User renewed successfully');
        });
      }
    }, (reason) => {
      console.log('Action canceled');
    });
  }
  

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to delete this user?';

    modalRef.result.then((result) => {
      if (result === 'confirmed') {
        this.userService.deleteUser(user).subscribe(() => {
          this.filteredUsers = this.filteredUsers.filter(u => u !== user);
          console.log('User deleted successfully');
        });
      }
    }, (reason) => {
      console.log('Action canceled');
    });
  }
}
