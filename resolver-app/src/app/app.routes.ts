import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users';
import { UserResolver } from './resolvers/user-resolver';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    resolve: { usersData: UserResolver }
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];