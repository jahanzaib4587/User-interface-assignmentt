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
  
  // Generate a consistent color based on the initials
  const colors = [
    { bg: '#3B82F6', text: '#FFFFFF' }, // Blue
    { bg: '#8B5CF6', text: '#FFFFFF' }, // Purple
    { bg: '#10B981', text: '#FFFFFF' }, // Emerald
    { bg: '#F59E0B', text: '#FFFFFF' }, // Amber
    { bg: '#EF4444', text: '#FFFFFF' }, // Red
    { bg: '#6366F1', text: '#FFFFFF' }, // Indigo
    { bg: '#EC4899', text: '#FFFFFF' }, // Pink
    { bg: '#14B8A6', text: '#FFFFFF' }, // Teal
  ];
  
  // Use the first character of first name to determine color
  const colorIndex = safeFirstName.charCodeAt(0) % colors.length;
  const selectedColor = colors[colorIndex];
  
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${selectedColor.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${selectedColor.bg};stop-opacity:0.8" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.1)"/>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#grad)" filter="url(#shadow)"/>
      <text x="60" y="60" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="36" font-weight="600" fill="${selectedColor.text}" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
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