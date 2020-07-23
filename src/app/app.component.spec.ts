import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {LoggingService} from './logging.service';
import {AuthService} from './auth/auth.service';
import {DataStorageService} from './shared/data-storage.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {

  let loggingService: SpyObj<LoggingService>;
  let authService: SpyObj<AuthService>;
  let dataStorageService: SpyObj<DataStorageService>;

  beforeEach(async(() => {

    loggingService = createSpyObj(LoggingService.name, ['printLog']);
    authService = createSpyObj(AuthService.name, ['autoLogin']);
    dataStorageService = createSpyObj(DataStorageService.name, ['getRecipes', 'storeRecipes']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports: [
        AppRoutingModule,
        AuthModule
      ],
      providers: [
        {provide: LoggingService, use: loggingService},
        {provide: AuthService, use: authService},
        {provide: DataStorageService, use: dataStorageService}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
