import { StrapiImage } from '../shared/model';

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage;
}
