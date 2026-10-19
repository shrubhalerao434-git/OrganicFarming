export interface Product {
  id: number;
  name: string;
  category_id: number | null;
  category_name: string | null;
  unit: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  category_id?: number | null;
  unit?: string;
  quantity?: number;
  price?: number;
}
