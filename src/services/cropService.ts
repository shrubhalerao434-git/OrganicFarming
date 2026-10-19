import { api } from './api';
import { Crop, CreateCropInput } from '@/types/crop';

export const cropService = {
  /** Fetch all crops */
  getAll: () => api.get<Crop[]>('/crops'),

  /** Create a new crop */
  create: (input: CreateCropInput) => api.post<Crop>('/crops', input),

  /** Update a crop by id (e.g. change status) */
  update: (id: number, input: Partial<CreateCropInput>) =>
    api.put<Crop>(`/crops/${id}`, input),

  /** Delete a crop by id */
  remove: (id: number) => api.delete<{ message: string }>(`/crops/${id}`),
};
