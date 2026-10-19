/** OrganicFarming — App Configuration */

/** Base URL for all API requests — change to your server IP for real devices */
export const API_BASE_URL = 'http://localhost:5000/api';

export const APP_NAME = 'OrganicFarming';
export const APP_VERSION = '1.0.0';

/** Crop status options (must match backend CHECK constraint) */
export const CROP_STATUSES = ['Planned', 'Growing', 'Harvested'] as const;

/** Stock movement types */
export const MOVEMENT_TYPES = ['IN', 'OUT'] as const;

/** Default product unit options */
export const UNIT_OPTIONS = ['kg', 'g', 'litre', 'ml', 'piece', 'dozen', 'bag', 'box'] as const;
