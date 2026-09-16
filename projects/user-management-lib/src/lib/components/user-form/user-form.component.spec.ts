import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { UserModel } from '../../models/user.model';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let componentRef: ComponentRef<UserFormComponent>;
  let fixture: ComponentFixture<UserFormComponent>;

  const validUserMock: UserModel = {
    id: 1,
    username: 'johndoe',
    firstname: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: new Date('1990-01-01'),
    password: 'password123',
    confirmPassword: 'password123',
    active: true,
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserFormComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule, // Desactiva animaciones de Angular Material para los tests
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component and initialize empty form', () => {
    expect(component).toBeTruthy();
    expect(component.userForm).toBeDefined();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should patch form values when user input changes', () => {
    componentRef.setInput('user', validUserMock);
    fixture.detectChanges();

    expect(component.userForm.value.username).toBe('johndoe');
    expect(component.userForm.value.firstname).toBe('John');
    expect(component.userForm.value.email).toBe('john.doe@example.com');
  });

  it('should invalidate form when passwords do not match', () => {
    component.userForm.patchValue({
      ...validUserMock,
      password: 'password123',
      confirmPassword: 'differentPassword',
    });

    expect(component.userForm.hasError('notEqual')).toBeTrue();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should mark all fields as touched and NOT emit userSaved when form is invalid onSave', () => {
    spyOn(component.userSaved, 'emit');

    component.onSave();

    expect(component.userForm.touched).toBeTrue();
    expect(component.userSaved.emit).not.toHaveBeenCalled();
  });

  it('should emit userSaved with correct data when form is valid onSave', () => {
    spyOn(component.userSaved, 'emit');

    // Cargar un usuario existente con ID
    componentRef.setInput('user', validUserMock);
    fixture.detectChanges();

    // Modificar un campo
    component.userForm.patchValue({ firstname: 'John Updated' });

    component.onSave();

    expect(component.userSaved.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: 1,
        firstname: 'John Updated',
        surname: 'Doe',
      }),
    );
  });

  it('should emit userSaved without ID when creating a new user onSave', () => {
    spyOn(component.userSaved, 'emit');

    component.userForm.setValue({
      username: 'newuser',
      firstname: 'New',
      surname: 'User',
      email: 'new.user@example.com',
      dateOfBirth: new Date('1995-05-05'),
      password: 'password123',
      confirmPassword: 'password123',
      active: false,
    });

    component.onSave();

    expect(component.userSaved.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        username: 'newuser',
        email: 'new.user@example.com',
      }),
    );
  });
});
