export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = src;
  });
};

export const getAspectRatio = (width: number, height: number): number => {
  return width / height;
};

export const getImageClasses = (aspectRatio: number): string => {
  if (aspectRatio > 1.5) {
    return 'aspect-video object-cover';
  } else if (aspectRatio < 0.7) {
    return 'aspect-[3/4] object-cover';
  } else {
    return 'aspect-square object-cover';
  }
};

export const generateAvatarFallback = (firstName: string, lastName: string): string => {
  // Handle null/undefined names with fallbacks
  const safeFirstName = firstName || 'U';
  const safeLastName = lastName || 'N';
  
  const initials = `${safeFirstName.charAt(0)}${safeLastName.charAt(0)}`.toUpperCase();
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#e5e7eb"/>
      <text x="50" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#374151" text-anchor="middle" dominant-baseline="middle">
        ${initials}
      </text>
    </svg>`
  )}`;
};

export const isValidImageUrl = (url: string): boolean => {
  // Handle null/undefined/empty URLs
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}; 