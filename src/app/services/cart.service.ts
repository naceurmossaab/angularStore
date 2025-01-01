import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { ICartItem } from '../model/cart';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiURL = environment.apiUrl + 'cart';
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeCart();
  }

  initializeCart(): void {
    this.getCartItems().subscribe((items) => {
      this.cartItemsSubject.next(items);
    });
  }

  getItemById(id: number): Observable<ICartItem> {
    return this.http.get<ICartItem>(`${this.apiURL}/${id}`);
  }

  getCartItems(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  addToCart(item: ICartItem): Observable<any> {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
      return this.http.put(`${this.apiURL}/${existingItem.id}`, existingItem).pipe(
        tap(() => {
          this.cartItemsSubject.next([...currentItems]);
        })
      );
    } else {
      return this.http.post(this.apiURL, { ...item, quantity: 1 }).pipe(
        tap(() => {
          this.cartItemsSubject.next([...currentItems, { ...item, quantity: 1 }]);
        })
      );
    }
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${itemId}`).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value.filter((item) => item.id !== itemId);
        this.cartItemsSubject.next(currentItems);
      })
    );
  }

  clearCart(): Observable<any> {
    const deleteRequests = this.cartItemsSubject.value.map((item) =>
      this.http.delete(`${this.apiURL}/${item.id}`)
    );
    return forkJoin(deleteRequests).pipe(
      tap(() => {
        this.cartItemsSubject.next([]); // Clear the local cart state
      })
    );
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalItemCount(): number {
    return this.cartItemsSubject.value.length;
  }
}
