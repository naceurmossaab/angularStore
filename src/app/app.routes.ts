import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: 'products', component: ProductsListComponent },
      { path: 'cart', component: CartComponent },
    ]
  }
];
