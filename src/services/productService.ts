import { api } from './api';
import { Product, CreateProductInput } from '@/types/product';

export const productService = {
  /** Fetch all products (includes category_name via join) */
  getAll: () => api.get<Product[]>('/products'),

  /** Create a new product */
  create: (input: CreateProductInput) => api.post<Product>('/products', input),

  /** Update a product by id */
  update: (id: number, input: Partial<CreateProductInput>) =>
    api.put<Product>(`/products/${id}`, input),

  /** Delete a product by id */
  remove: (id: number) => api.delete<{ message: string }>(`/products/${id}`),
};
