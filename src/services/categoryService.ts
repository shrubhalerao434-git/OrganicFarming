import { api } from './api';
import { Category, CreateCategoryInput } from '@/types/category';

export const categoryService = {
  /** Fetch all categories */
  getAll: () => api.get<Category[]>('/categories'),

  /** Create a new category */
  create: (input: CreateCategoryInput) => api.post<Category>('/categories', input),

  /** Delete a category by id */
  remove: (id: number) => api.delete<{ message: string }>(`/categories/${id}`),
};
