import { StrapiImage } from "../shared/model";
import { Price } from "./price.i";

export interface ProductVariant {
  id: number;
  documentId: string;
  sku: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  additional_images: StrapiImage[];
  main_image: StrapiImage;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  is_featured: boolean;
  rating: number | null;
  reviews_count: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  variants: ProductVariant[];
  default_prices?: Price[];
}
