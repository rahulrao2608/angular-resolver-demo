import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ IMPORTANT
import { ActivatedRoute } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-users',
  standalone: true, // ✅ required
  imports: [CommonModule], // ✅ FIX HERE
  templateUrl: './users.html'
})
export class UsersComponent {

  users: User[] = [];

  constructor(private route: ActivatedRoute) {
    this.users = this.route.snapshot.data['usersData'];
  }
}