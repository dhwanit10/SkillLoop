// Authentication Services
export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  onAuthStateChange
} from './authService.js';

// Profile Services
export {
  createOrUpdateProfile,
  getUserProfile,
  getPublicProfiles,
  searchProfilesBySkill,
  getCurrentUserProfile,
  deleteUserProfile
} from './profileService.js';

// Swap Services
export {
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
  updateSwapStatus,
  deleteSwapRequest,
  getSwapRequest,
  getAllUserSwaps
} from './swapService.js';

// Firebase Config
export { auth, db } from '../firebase/config.js'; 