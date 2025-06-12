import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = process.env['API_URL'];

  private http = inject(HttpClient);

  getCategories(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/categories?populate=image`)
      .pipe(map((response) => response.data));
  }
}
