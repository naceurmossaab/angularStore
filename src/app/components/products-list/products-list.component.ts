import { Component } from '@angular/core';
import { IProduct } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CurrencyPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NzInputModule,
    NzTableModule,
    CurrencyPipe,
    NzTagModule,
    FormsModule,
    NgFor,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products: IProduct[] = [];
  loading = true;
  searchTerm: string = '';
  debouceTimer: any;
  sortOrder: 'asc' | 'desc' | '' = '';

  constructor(
    private service: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.service.getProducts().subscribe((products) => {
      this.products = products;
      this.loading = false;
    });
  }

  filterProducts(): void {
    //using debounce to avoid multiple api calls
    clearTimeout(this.debouceTimer);
    this.debouceTimer = setTimeout(() => {
      this.service.getProducts().subscribe((data) => {
        this.products = data.filter(
          (product: IProduct) =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.sortProducts(); // Apply sorting after filtering
      });
    }, 500);
  }

  sortProducts(): void {
    if (this.sortOrder) {
      this.products.sort((a, b) =>
        this.sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price
      );
    }
  }

  onSortChange(value: string): void {
    this.sortOrder = value as 'asc' | 'desc' | ''; // Update sorting order
    this.sortProducts(); // Apply sorting
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

}
