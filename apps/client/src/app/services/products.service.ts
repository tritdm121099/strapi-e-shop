import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.i';
import { StrapiGetList } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = "/api";

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    let params = new HttpParams();
    const paramsData = [
      'variants',
      'variants.main_image',
      'variants.additional_images',
      'default_prices',
      'default_prices.currency',
    ];
    paramsData.forEach((param, index) => {
      params = params.set(`populate[${index}]`, param);
    });

    return this.http
      .get<StrapiGetList<Product>>(`${this.apiUrl}/products`, {
        params: params,
      })
      .pipe(map((response) => response.data));
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http
      .get<any>(
        `<span class="math-inline">\{this\.apiUrl\}/products?filters\[slug\]\=</span>{slug}&populate=deep`
      )
      .pipe(map((response) => response.data[0]));
  }
}
