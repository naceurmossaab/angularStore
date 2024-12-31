import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICartItem } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: ICartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }
    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItemsSubject.value.filter((item) => item.id !== itemId);
    this.cartItemsSubject.next(currentItems);
  }
}
