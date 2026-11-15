import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Product } from '../models/product';
import { Observable, tap } from 'rxjs';

const URL = 'http://localhost:3100/products';
@Service()
export class ProductService {
    private readonly _http = inject(HttpClient);
    private readonly _products = signal<Product[]>([]);
    products = this._products.asReadonly();

    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(URL)
            .pipe(tap(allProducts => this._products.set(allProducts)));
    }
    addProduct(p: Product): Observable<Product> {
        return this._http.post<Product>(URL, p).pipe(
            tap(productAdded =>
                this._products.update(produits => [...produits, productAdded]))
        )
    }

    updateProduct(newProduct: Product): Observable<Product> {
        return this._http.put<Product>(`${URL}/${newProduct.id}`, newProduct)
            .pipe(
                tap(updatedProduct =>
                    this._products.update(allProducts => allProducts.map(p =>
                        (p.id == newProduct.id) ? updatedProduct : p
                    ))
                )
            )
    }

    deleteProduct(id: string): Observable<void> {
        return this._http.delete<void>(`${URL}/${id}`).pipe(
            tap(() => this._products.update(allProducts => allProducts.filter(p => p.id != id)))
        )
    }
    getProductById(id: string): Observable<Product> {
        return this._http.get<Product>(`${URL}/${id}`);
    }

}
