import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Sản phẩm nổi bật</h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          *ngFor="let product of products"
          class="bg-white rounded-lg shadow-md p-4"
        >
          <img
            *ngIf="product.variants[0].main_image.url as imgUrl"
            [src]="'http://localhost:1337'+imgUrl"
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
            *ngIf="product.default_prices?.length > 0"
            class="text-lg font-bold text-blue-600 mt-3"
          >
            {{
              product.default_prices[0].price
                | currency
                  : product.default_prices[0].currency.data.code
                  : 'symbol'
                  : '1.0-2'
            }}
          </div>
          <!-- <a
            [routerLink]="['/products', product.attributes.slug]"
            class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Xem chi tiết
          </a> -->
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
