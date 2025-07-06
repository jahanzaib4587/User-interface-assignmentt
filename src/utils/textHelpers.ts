/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters to show
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string | null | undefined, maxLength: number): string => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Truncates text by word count instead of character count
 * @param text - The text to truncate
 * @param maxWords - Maximum number of words to show
 * @returns Truncated text with ellipsis if needed
 */
export const truncateByWords = (text: string | null | undefined, maxWords: number): string => {
  if (!text) return '';
  
  const words = text.split(' ');
  
  if (words.length <= maxWords) {
    return text;
  }
  
  return words.slice(0, maxWords).join(' ') + '...';
};

/**
 * Truncates email to fit in smaller spaces while keeping it readable
 * @param email - The email to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated email that preserves domain when possible
 */
export const truncateEmail = (email: string | null | undefined, maxLength: number): string => {
  if (!email) return '';
  
  if (email.length <= maxLength) {
    return email;
  }
  
  const [username, domain] = email.split('@');
  
  if (!domain) {
    return truncateText(email, maxLength);
  }
  
  // Try to preserve domain by truncating username
  const domainPart = `@${domain}`;
  const availableUsernameLength = maxLength - domainPart.length - 3; // 3 for "..."
  
  if (availableUsernameLength > 3) {
    return `${username.slice(0, availableUsernameLength)}...${domainPart}`;
  }
  
  // If domain is too long, truncate the whole email
  return truncateText(email, maxLength);
};

/**
 * Truncates location string (city, state, country) intelligently
 * @param location - The location string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated location string
 */
export const truncateLocation = (location: string | null | undefined, maxLength: number): string => {
  if (!location) return '';
  
  if (location.length <= maxLength) {
    return location;
  }
  
  // Try to keep the most important part (usually the city)
  const parts = location.split(',').map(part => part.trim());
  
  if (parts.length > 1) {
    // Start with first part (city) and add others if they fit
    let result = parts[0];
    
    for (let i = 1; i < parts.length; i++) {
      const addition = `, ${parts[i]}`;
      if ((result + addition).length <= maxLength) {
        result += addition;
      } else {
        break;
      }
    }
    
    // If we couldn't fit everything and result is not the full string
    if (result !== location) {
      return result + '...';
    }
    
    return result;
  }
  
  return truncateText(location, maxLength);
}; 