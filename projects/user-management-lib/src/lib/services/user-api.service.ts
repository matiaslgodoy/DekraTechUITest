import { effect, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserUtils } from '../shared/utils/user-utils';

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

  getUserById(userId: string): UserModel | null {
    //Aqui deberia llamar al backend con un http get
    return this.userList().find((u) => u.id === Number(userId)) || null;
  }
  deleteUserById(userId: number): void {
    //aqui deberia llamar al back con un http delete
    const filterUserList = this.userList().filter((u) => u.id !== userId);
    this.userList.set(filterUserList);
  }
}
