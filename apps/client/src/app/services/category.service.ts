import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../model/category.i';
import { StrapiGetList } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = '/api';

  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http
      .get<StrapiGetList<Category>>(`${this.apiUrl}/categories?populate=image`)
      .pipe(map((response) => response.data));
  }
}
