import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzLayoutModule, NzMenuModule, NzBadgeModule, CurrencyPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: number = 0;
  totalPrice: number = 0;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
      this.totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });
  }
}
