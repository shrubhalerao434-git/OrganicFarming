import { api } from './api';
import { StockMovement, AdjustStockInput } from '@/types/inventory';

export const inventoryService = {
  /** Fetch all stock movements (latest first) */
  getAll: () => api.get<StockMovement[]>('/inventory'),

  /** Add a stock IN or OUT movement */
  adjust: (input: AdjustStockInput) => api.post<StockMovement>('/inventory', input),
};
