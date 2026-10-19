/** OrganicFarming — App Color Palette */
export const Colors = {
  /** Brand green — primary actions, headers */
  primary: '#176B3A',
  /** Light mint — backgrounds, chips */
  primaryLight: '#D9F0DF',
  /** Deep forest — headings */
  primaryDark: '#183D27',

  /** App screen background */
  background: '#F4F8F1',
  /** Card / surface white */
  surface: '#FFFFFF',

  /** Main text */
  textPrimary: '#183D27',
  /** Secondary / hint text */
  textSecondary: '#687568',
  /** Muted body text */
  textMuted: '#405345',

  /** Dividers & borders */
  border: '#E0EDE5',

  /** Semantic colours */
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  info: '#0288D1',

  /** Status badge colours */
  statusPlanned: '#FFF3E0',
  statusPlannedText: '#E65100',
  statusGrowing: '#E8F5E9',
  statusGrowingText: '#2E7D32',
  statusHarvested: '#E3F2FD',
  statusHarvestedText: '#1565C0',
} as const;

export type AppColor = keyof typeof Colors;
