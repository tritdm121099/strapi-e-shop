import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // apiUrl = process.env['API_URL'];
  apiUrl = 'http://localhost:1337/api';

  private http = inject(HttpClient);

  getProducts(): Observable<any[]> {
    // let params = new HttpParams();
    // params = params.set('populate'));

    return this.http
      .get<any>(`${this.apiUrl}/products?populate[0]=variants&populate[1]=variants.main_image&populate[2]=variants.additional_images`, {
        // params: params,
        headers: {
          'Cache-Control':
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .pipe(
        map((response) => response.data)
      );
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http
      .get<any>(
        `<span class="math-inline">\{this\.apiUrl\}/products?filters\[slug\]\=</span>{slug}&populate=deep`
      )
      .pipe(map((response) => response.data[0]));
  }
}
