import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit{

  private readonly productService = inject(ProductService);
  products = this.productService.products;
  ngOnInit(): void {
      this.productService.getProducts().subscribe();
  }

  onAddProduct(){
    let newProduct = { id:"xyzDSI", name:"crayon", price:2.3}
    this.productService.addProduct(newProduct).subscribe();    
  }

}
