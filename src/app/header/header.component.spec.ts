import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dataStorageService: SpyObj<DataStorageService>;
  let authService: SpyObj<AuthService>;

  dataStorageService = createSpyObj(DataStorageService.name, ['getRecipes', 'storeRecipes']);
  authService = createSpyObj(AuthService.name, ['logout']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        {provide: DataStorageService, use: dataStorageService},
        {provide: AuthService, use: authService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
