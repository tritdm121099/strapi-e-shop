import { StrapiImage } from '../shared/model';

export interface Banner {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  image: StrapiImage;
  link?: string;
  button_text?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
