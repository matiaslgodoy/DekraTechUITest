import { UserModel } from '../../models/user.model';

export class UserUtils {
  static getRandomDateBetween(
    startDate: Date,
    endDate: Date = new Date(),
  ): Date {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp =
      startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    return new Date(randomTimestamp);
  }

  static normalizeDate(dateValue: Date | string | null): string {
    if (!dateValue) return new Date().toString();
    const d = new Date(dateValue);
    return d.toString();
  }

  static normalizeUserFromBackend(
    userList: UserModel[],
    user: UserModel,
  ): UserModel {
    //Esto deberia hacerlo el backend
    const createdDay = new Date();
    createdDay.setHours(0, 0, 0, 0);
    user.id =
      userList.length > 0 ? Math.max(...userList.map((u) => u.id)) + 1 : 1;
    user.dateCreated = this.normalizeDate(createdDay.toString());
    user.dateLastLoggin = this.normalizeDate(
      UserUtils.getRandomDateBetween(createdDay, new Date()),
    );
    user.dateOfBirth = this.normalizeDate(user.dateOfBirth);

    return user;
  }
}
