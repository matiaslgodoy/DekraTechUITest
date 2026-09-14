import { effect, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserUtils } from '../utils/user-utils';

const USER_KEY = 'users';

const loadFromLocalStorage = () => {
  const userFromStorage = localStorage.getItem(USER_KEY) ?? null;
  return userFromStorage ? JSON.parse(userFromStorage) : [];
};

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  userList = signal<UserModel[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(this.userList()));
  });

  addUser(user: UserModel) {
    //Esto deberia hacerlo el backend
    user = UserUtils.normalizeUserFromBackend(this.userList(), user);
    this.userList.update((list) => [...list, user]);
  }
}
