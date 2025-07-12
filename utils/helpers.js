/**
 * Utility functions for the Skill Swap application
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Format timestamp to readable date
 * @param {Date|Timestamp} timestamp - Firebase timestamp or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID string
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate profile data
 * @param {Object} profileData - Profile data to validate
 * @returns {Object} Validation result with isValid and errors array
 */
export const validateProfileData = (profileData) => {
  const errors = [];
  
  if (!profileData.name || profileData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!profileData.location || profileData.location.trim().length < 2) {
    errors.push('Location must be at least 2 characters long');
  }
  
  if (!profileData.skillsOffered || !Array.isArray(profileData.skillsOffered) || profileData.skillsOffered.length === 0) {
    errors.push('At least one skill offered is required');
  }
  
  if (!profileData.skillsWanted || !Array.isArray(profileData.skillsWanted) || profileData.skillsWanted.length === 0) {
    errors.push('At least one skill wanted is required');
  }
  
  if (!profileData.availability || !Array.isArray(profileData.availability) || profileData.availability.length === 0) {
    errors.push('At least one availability option is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize user input
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Convert array to comma-separated string
 * @param {Array} array - Array to convert
 * @returns {string} Comma-separated string
 */
export const arrayToString = (array) => {
  if (!Array.isArray(array)) return '';
  return array.join(', ');
};

/**
 * Convert comma-separated string to array
 * @param {string} string - String to convert
 * @returns {Array} Array of items
 */
export const stringToArray = (string) => {
  if (typeof string !== 'string') return [];
  return string.split(',').map(item => item.trim()).filter(item => item.length > 0);
};

/**
 * Get user initials from name
 * @param {string} name - Full name
 * @returns {string} User initials
 */
export const getUserInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}; 