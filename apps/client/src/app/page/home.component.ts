import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BannerSliderComponent } from '../components/banner-slider/banner-slider.component';
import { Product } from '../model/product.i';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, BannerSliderComponent,],
  template: `
    <div class="container mx-auto p-4">
      <app-banner-slider class="mb-6"></app-banner-slider>

      <h1 class="text-3xl font-bold text-gray-800 mb-6">Sản phẩm nổi bật</h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        @for (product of products(); track product.id) {
        <div class="bg-white rounded-lg shadow-md p-4">
          <img
            *ngIf="product.variants[0].main_image.url as imgUrl"
            [src]="imgUrl"
            alt="{{ product.name }}"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-600">
            {{ product.description | slice : 0 : 100 }}...
          </p>
          <div
            *ngIf="product.default_prices!.length > 0"
            class="text-lg font-bold text-blue-600 mt-3"
          >
            {{
              product.default_prices![0].price
                | currency
                  : product.default_prices![0].currency.code
                  : 'symbol'
                  : '1.0-2'
            }}
          </div>
          <a
            [routerLink]="['/products', product.slug]"
            class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Xem chi tiết
          </a>
        </div>
        }
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  products = signal<Product[]>([]);

  productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
