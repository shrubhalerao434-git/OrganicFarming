export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}
