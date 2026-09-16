import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let componentRef: ComponentRef<UserTableComponent>;
  let fixture: ComponentFixture<UserTableComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockUsers: UserModel[] = [
    {
      id: 1,
      username: 'jdoe',
      firstname: 'John',
      surname: 'Doe',
      birthdate: new Date('1990-01-01'),
      createdAt: new Date('2023-01-01'),
      lastLogin: new Date('2023-05-01'),
      active: true,
    } as any,
    {
      id: 2,
      username: 'mrossi',
      firstname: 'Mario',
      surname: 'Rossi',
      birthdate: new Date('1985-05-15'),
      createdAt: new Date('2022-01-01'),
      lastLogin: new Date('2023-06-01'),
      active: false,
    } as any,
  ];

  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        UserTableComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule, // Evita problemas con las animaciones de Angular Material
      ],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        provideRouter([]), // Provee dependencias necesarias para RouterLink
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource.data when userList input changes', () => {
    // Asignamos el valor al signal input utilizando setInput
    componentRef.setInput('userList', mockUsers);
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(mockUsers);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should return full name correctly via getFullName', () => {
    const fullName = component.getFullName(mockUsers[0]);
    expect(fullName).toBe('John Doe');
  });

  it('should correctly access sorting data for "name" property', () => {
    fixture.detectChanges();
    const sortingAccessor = component.dataSource.sortingDataAccessor;

    const nameValue = sortingAccessor(mockUsers[0], 'name');
    const usernameValue = sortingAccessor(mockUsers[0], 'username');

    expect(nameValue).toBe('john doe');
    expect(usernameValue).toBe('jdoe');
  });

  it('should open delete dialog and emit deleteUserById when confirmed', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true)); // Simula que el usuario hizo clic en "Aceptar"
    dialogSpy.open.and.returnValue(dialogRefSpy);

    spyOn(component.deleteUserById, 'emit');

    component.openDialog(1);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.deleteUserById.emit).toHaveBeenCalledWith(1);
  });

  it('should open delete dialog and NOT emit deleteUserById when cancelled', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(false)); // Simula que el usuario canceló
    dialogSpy.open.and.returnValue(dialogRefSpy);

    spyOn(component.deleteUserById, 'emit');

    component.openDialog(1);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.deleteUserById.emit).not.toHaveBeenCalled();
  });
});
