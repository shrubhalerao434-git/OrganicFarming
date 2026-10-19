export type MovementType = 'IN' | 'OUT';

export interface StockMovement {
  id: number;
  product_id: number;
  product_name?: string;
  movement_type: MovementType;
  quantity: number;
  notes: string | null;
  movement_date: string;
}

export interface AdjustStockInput {
  product_id: number;
  movement_type: MovementType;
  quantity: number;
  notes?: string;
}
