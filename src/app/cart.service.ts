import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items: Product[] = [];
  itemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getItemCount() {
    return this.itemCount.asObservable();
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.itemCount.next(this.items.length);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.itemCount.next(this.items.length);
    return this.items;
  }

  countItem() {
    return this.items?.length || 0;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}
