import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ICartItem } from '../../model/cart';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NzTableModule, NzButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: ICartItem[] = [];
  totalPrice = 0;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.service.getTotalPrice();
    });
  }

  removeItem(itemId: number): void {
    this.service.removeFromCart(itemId).subscribe();
  }

  clearCart(): void {
    this.service.clearCart().subscribe();
  }
}
