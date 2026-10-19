export type CropStatus = 'Planned' | 'Growing' | 'Harvested';

export interface Crop {
  id: number;
  name: string;
  field_name: string | null;
  planting_date: string | null;
  expected_harvest_date: string | null;
  status: CropStatus;
  created_at: string;
}

export interface CreateCropInput {
  name: string;
  field_name?: string;
  planting_date?: string;
  expected_harvest_date?: string;
  status?: CropStatus;
}
