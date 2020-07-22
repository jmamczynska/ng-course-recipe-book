import {Ingredient} from '../shared/ingredient.model';
import {forkJoin, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ShoppingListService {

  private readonly shoppingListUrl = 'http://localhost:8080/api/ingredient';

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.saveIngredient(ingredient).subscribe(response => {
      this.ingredients.push(response);
      this.emitChanges();
    }, error => console.log(error));
  }

  addIngredients(ingredients: Ingredient[]) {
    const calls = [];
    ingredients.forEach((ingredient: Ingredient) => {
      calls.push(this.saveIngredient(ingredient));
    });
    forkJoin(calls).subscribe((responses: Ingredient[]) => {
      this.ingredients.push(...responses);
      this.emitChanges();
    });
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.httpClient.put(this.shoppingListUrl, newIngredient)
        .subscribe((result: Ingredient) => {
          this.ingredients[index] = result;
          this.emitChanges();
        });
  }

  removeIngredient(index: number) {
    this.httpClient.delete(this.shoppingListUrl + '/' + this.ingredients[index].id)
        .subscribe(() => {
          this.ingredients.splice(index, 1);
          this.emitChanges();
        });
  }

  removeAllIngredients() {
    this.httpClient.delete(this.shoppingListUrl)
        .subscribe(() => {
          this.ingredients.splice(0, this.ingredients.length);
          this.emitChanges();
        });
  }

  fetchIngredients() {
    this.httpClient.get<Ingredient[]>(this.shoppingListUrl)
        .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          this.emitChanges();
        });
  }

  private saveIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.shoppingListUrl, ingredient);
  }

  private emitChanges(): void {
    this.ingredientsChanged.next(this.getIngredients());
  }
}
