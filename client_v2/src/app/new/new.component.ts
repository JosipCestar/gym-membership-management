import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../users.service';
import { User } from '../users.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    plan: new FormControl("Standard", Validators.required),
    phone_number: new FormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
    pin: new FormControl("", [Validators.required, Validators.pattern(/^\d{1,4}$/)])
  });

  constructor(protected userService: UserService, protected router: Router) {}

  // Method to format the phone number
  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // Method to add a month to the current date
  addMonthToDate(date: Date): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result;
  }

  createUser() {
    if (this.form.valid) {
      // Format the phone number
      const formattedPhoneNumber = this.formatPhoneNumber(this.form.value.phone_number);

      // Add a month to the current date
      const currentDate = new Date();
      const datePlusOneMonth = this.addMonthToDate(currentDate).toISOString();

      const newUser: Partial<User> = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        email: this.form.value.email,
        plan: this.form.value.plan,
        phone_number: formattedPhoneNumber,
        date: datePlusOneMonth,
        PIN: this.form.value.pin,
      };

      this.userService.createUser(newUser as User).subscribe((res: any) => {
        this.form.reset();
      });
    }
  }
}
