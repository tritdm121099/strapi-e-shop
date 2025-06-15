import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner } from '../model/banner.i';
import { StrapiGetList } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private http: HttpClient) {}

  getBanners$(): Observable<Banner[]> {
    let params = new HttpParams().set('populate', 'image').set('sort', 'order');

    return this.http
      .get<StrapiGetList<Banner>>(`/api/banners`, { params })
      .pipe(map((response) => response.data));
  }
}
