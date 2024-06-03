import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export interface User {
  _id?: string;
  PIN: number;
  name: string;
  surname: string;
  email: string;
  plan: string;
  date: string;
  phone_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {
    this.getUsers().subscribe();
  }

  users: WritableSignal<User[]> = signal([]);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/clanovi")
      .pipe(
        tap((res: User[]) => {
          this.users.set(res);
        })
      );
  }

  createUser(user: User): Observable<{ message: string, user: User }> {
    return this.http.post<{ message: string, user: User }>("/api/clanovi", user)
      .pipe(
        tap((res: { message: string, user: User }) => {
          this.users.update((users: User[]) => {
            return [...users, res.user];
          });
        })
      );
  }

  deleteUser(user: User): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/api/clanovi/${user._id}`)
      .pipe(
        tap((res: { message: string }) => {
          this.users.update((users: User[]) => {
            return users.filter((user_: User) => {
              return user_._id !== user._id;
            });
          });
        })
      );
  }

  updateUser(user: User): Observable<{ message: string, user: User }> {
    return this.http.put<{ message: string, user: User }>(`/api/clanovi/${user._id}`, user)
      .pipe(
        tap((res: { message: string, user: User }) => {
          this.users.update((users: User[]) => {
            return users.map((user_: User) => user_._id === user._id ? res.user : user_);
          });
        })
      );
  }
}
