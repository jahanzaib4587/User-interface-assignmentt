export const API_ENDPOINTS = {
  USERS: '/users',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  USER_NOT_FOUND: 'User not found.',
  IMAGE_LOAD_ERROR: 'Failed to load image.',
} as const;

export const IMAGE_CONFIG = {
  FALLBACK_AVATAR: 'https://via.placeholder.com/150x150/e2e8f0/64748b?text=User',
  LOADING_TIMEOUT: 8000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const TRUNCATION_CONFIG = {
  DEFAULT_LENGTH: 50,
  EMAIL_MIN_LENGTH: 20,
  LOCATION_MIN_LENGTH: 15,
  ELLIPSIS: '...',
} as const;

export const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.05,
  MAX_STAGGER_DELAY: 1,
  CARD_HOVER_SCALE: 1.02,
  BUTTON_HOVER_SCALE: 1.05,
} as const; 