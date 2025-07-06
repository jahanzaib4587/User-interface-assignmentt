export const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const IMAGE_ASPECT_RATIOS = {
  SQUARE: 1,
  PORTRAIT: 0.75,
  LANDSCAPE: 1.33,
  WIDE: 1.5,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  USER_NOT_FOUND: 'User not found.',
  IMAGE_LOAD_ERROR: 'Failed to load image.',
} as const; 