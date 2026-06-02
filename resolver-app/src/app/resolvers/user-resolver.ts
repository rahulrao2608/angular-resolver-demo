import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { UserService, User } from '../services/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {

  constructor(private userService: UserService) {}

  resolve(): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError(() => of([]))
    );
  }
}