import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { getCurrentUser } from './authService.js';

/**
 * Create or update a user profile
 * @param {string} uid - User ID
 * @param {Object} profileData - Profile data object
 * @returns {Promise<void>}
 */
export const createOrUpdateProfile = async (uid, profileData) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error('Unauthorized: Can only update your own profile');
    }

    const profileRef = doc(db, 'profiles', uid);
    const profileWithTimestamp = {
      ...profileData,
      updatedAt: new Date(),
      createdAt: profileData.createdAt || new Date()
    };

    await setDoc(profileRef, profileWithTimestamp, { merge: true });
  } catch (error) {
    throw new Error(`Profile update failed: ${error.message}`);
  }
};

/**
 * Get a specific user's profile
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>} Profile data or null if not found
 */
export const getUserProfile = async (uid) => {
  try {
    const profileRef = doc(db, 'profiles', uid);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return { id: profileSnap.id, ...profileSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Failed to get profile: ${error.message}`);
  }
};

/**
 * Get all public profiles
 * @returns {Promise<Array>} Array of public profiles
 */
export const getPublicProfiles = async () => {
  try {
    const profilesRef = collection(db, 'profiles');
    const q = query(
      profilesRef, 
      where('isPublic', '==', true),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const profiles = [];
    
    querySnapshot.forEach((doc) => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    
    return profiles;
  } catch (error) {
    throw new Error(`Failed to get public profiles: ${error.message}`);
  }
};

/**
 * Search profiles by skill (in skillsOffered or skillsWanted)
 * @param {string} skill - Skill to search for
 * @returns {Promise<Array>} Array of matching profiles
 */
export const searchProfilesBySkill = async (skill) => {
  try {
    const profilesRef = collection(db, 'profiles');
    
    // Search in skillsOffered
    const offeredQuery = query(
      profilesRef,
      where('skillsOffered', 'array-contains', skill),
      where('isPublic', '==', true)
    );
    
    // Search in skillsWanted
    const wantedQuery = query(
      profilesRef,
      where('skillsWanted', 'array-contains', skill),
      where('isPublic', '==', true)
    );
    
    const [offeredSnapshot, wantedSnapshot] = await Promise.all([
      getDocs(offeredQuery),
      getDocs(wantedQuery)
    ]);
    
    const profiles = new Map(); // Use Map to avoid duplicates
    
    // Add profiles from skillsOffered
    offeredSnapshot.forEach((doc) => {
      const profile = { id: doc.id, ...doc.data() };
      profiles.set(doc.id, { ...profile, matchType: 'offered' });
    });
    
    // Add profiles from skillsWanted
    wantedSnapshot.forEach((doc) => {
      const profile = { id: doc.id, ...doc.data() };
      if (profiles.has(doc.id)) {
        // Profile matches both offered and wanted
        profiles.set(doc.id, { ...profile, matchType: 'both' });
      } else {
        profiles.set(doc.id, { ...profile, matchType: 'wanted' });
      }
    });
    
    return Array.from(profiles.values());
  } catch (error) {
    throw new Error(`Search failed: ${error.message}`);
  }
};

/**
 * Get current user's profile
 * @returns {Promise<Object|null>} Current user's profile or null
 */
export const getCurrentUserProfile = async () => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return null;
    }
    
    return await getUserProfile(currentUser.uid);
  } catch (error) {
    throw new Error(`Failed to get current user profile: ${error.message}`);
  }
};

/**
 * Delete a user profile
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const deleteUserProfile = async (uid) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error('Unauthorized: Can only delete your own profile');
    }

    const profileRef = doc(db, 'profiles', uid);
    await deleteDoc(profileRef);
  } catch (error) {
    throw new Error(`Profile deletion failed: ${error.message}`);
  }
}; 