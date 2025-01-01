import { Component, Input } from '@angular/core';
import { IProduct } from '../../model/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartService } from '../../services/cart.service';

@Component({
  selector: '[app-product]',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NzTagModule, NzButtonModule],
  template: `
    <td>{{ product.name }}</td>
      <td>{{ product.price | currency }}</td>
      <td>{{ product.category }}</td>
      <td>
        <nz-tag [nzColor]="product.availability ? 'green' : 'red'">
          {{ product.availability ? 'In Stock' : 'Out of Stock' }}
        </nz-tag>
      </td>
      <td>
        <button nz-button nzType="default" (click)="addToCart()" [disabled]="loading || !product.availability">
          <span *ngIf="loading">Adding...</span>
        <span *ngIf="!loading">Add to Cart</span>
        </button>
      </td>
  `,
  styles: []
})
export class ProductComponent {
  @Input() product!: any;
  loading = false;

  constructor(private cartService: CartService) { }


  addToCart(): void {
    this.loading = true;
    this.cartService.addToCart(this.product).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
