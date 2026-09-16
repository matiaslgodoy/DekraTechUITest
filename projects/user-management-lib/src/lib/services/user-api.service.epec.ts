import { TestBed } from '@angular/core/testing';
import { UserModel } from '../models/user.model';
import { UserUtils } from '../shared/utils/user-utils';
import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  const mockUser: UserModel = {
    id: 1,
    name: 'Matias',
    email: 'matias@test.com',
  } as UserModel;

  beforeEach(() => {
    // Limpia el almacenamiento local simulado antes de cada prueba
    localStorage.clear();
    spyOn(UserUtils, 'normalizeUserFromBackend').and.callFake(
      (list, user) => user,
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created and initialize userList from localStorage', () => {
    const initialUsers: UserModel[] = [mockUser];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(initialUsers),
    );

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    expect(service).toBeTruthy();
    expect(service.userList()).toEqual(initialUsers);
  });

  it('should initialize with an empty list if localStorage has no data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    expect(service.userList()).toEqual([]);
  });

  it('should add a new user to the list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    service.addUser(mockUser);

    expect(service.userList().length).toBe(1);
    expect(service.userList()[0]).toEqual(mockUser);
    expect(UserUtils.normalizeUserFromBackend).toHaveBeenCalled();
  });

  it('should update an existing user if ID already exists', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    service.addUser(mockUser);

    const updatedUser: UserModel = {
      ...mockUser,
      name: 'Matias Updated',
    };

    service.addUser(updatedUser);

    expect(service.userList().length).toBe(1);
    expect(service.userList()[0].name).toBe('Matias Updated');
  });

  it('should return user by string ID when found or null when not found', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    service.addUser(mockUser);

    const foundUser = service.getUserById('1');
    const notFoundUser = service.getUserById('99');

    expect(foundUser).toEqual(mockUser);
    expect(notFoundUser).toBeNull();
  });

  it('should delete a user by numeric ID', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    service.addUser(mockUser);
    expect(service.userList().length).toBe(1);

    service.deleteUserById(1);

    expect(service.userList().length).toBe(0);
  });

  it('should persist userList updates to localStorage via effect', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);

    // TestBed.flushEffects procesa los efectos reactivos dentro del ciclo de prueba de Angular
    TestBed.flushEffects();

    service.addUser(mockUser);
    TestBed.flushEffects();

    expect(setItemSpy).toHaveBeenCalledWith(
      'users',
      JSON.stringify([mockUser]),
    );
  });
});
