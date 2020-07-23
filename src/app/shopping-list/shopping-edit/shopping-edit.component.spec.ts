import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../shared/shared.module';
import {ShoppingEditComponent} from './shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {ShoppingListService} from '../shopping-list.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('Shopping-edit component ', () => {

  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  let shoppingListService: SpyObj<ShoppingListService>;

  beforeEach(async(() => {
    shoppingListService = createSpyObj(ShoppingListService.name, [
      'getIngredient',
      'removeIngredient',
      'updateIngredient',
      'addIngredient'
    ]);

    TestBed.configureTestingModule({
      declarations: [
        ShoppingEditComponent
      ],
      imports: [
        FormsModule,
        SharedModule
      ],
      providers: [
        {provide: ShoppingListService, use: shoppingListService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
