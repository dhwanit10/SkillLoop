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
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { getCurrentUser } from './authService.js';

/**
 * Send a swap request from one user to another
 * @param {string} fromUserId - ID of the user sending the request
 * @param {string} toUserId - ID of the user receiving the request
 * @returns {Promise<string>} Swap request ID
 */
export const sendSwapRequest = async (fromUserId, toUserId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== fromUserId) {
      throw new Error('Unauthorized: Can only send requests from your own account');
    }

    if (fromUserId === toUserId) {
      throw new Error('Cannot send swap request to yourself');
    }

    // Check if a request already exists
    const existingRequests = await getSentRequests(fromUserId);
    const alreadyRequested = existingRequests.some(request => request.toUserId === toUserId);
    
    if (alreadyRequested) {
      throw new Error('Swap request already sent to this user');
    }

    const swapData = {
      fromUserId,
      toUserId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'swaps'), swapData);
    return docRef.id;
  } catch (error) {
    throw new Error(`Failed to send swap request: ${error.message}`);
  }
};

/**
 * Get all swap requests sent by a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of sent swap requests
 */
export const getSentRequests = async (userId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== userId) {
      throw new Error('Unauthorized: Can only view your own sent requests');
    }

    const swapsRef = collection(db, 'swaps');
    const q = query(
      swapsRef,
      where('fromUserId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const requests = [];
    
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    
    return requests;
  } catch (error) {
    throw new Error(`Failed to get sent requests: ${error.message}`);
  }
};

/**
 * Get all swap requests received by a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of received swap requests
 */
export const getReceivedRequests = async (userId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== userId) {
      throw new Error('Unauthorized: Can only view your own received requests');
    }

    const swapsRef = collection(db, 'swaps');
    const q = query(
      swapsRef,
      where('toUserId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const requests = [];
    
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    
    return requests;
  } catch (error) {
    throw new Error(`Failed to get received requests: ${error.message}`);
  }
};

/**
 * Update the status of a swap request
 * @param {string} swapId - Swap request ID
 * @param {string} status - New status ('pending', 'accepted', 'rejected')
 * @returns {Promise<void>}
 */
export const updateSwapStatus = async (swapId, status) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: Must be logged in to update swap status');
    }

    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status. Must be one of: pending, accepted, rejected');
    }

    // Get the swap request to verify ownership
    const swapRef = doc(db, 'swaps', swapId);
    const swapSnap = await getDoc(swapRef);
    
    if (!swapSnap.exists()) {
      throw new Error('Swap request not found');
    }

    const swapData = swapSnap.data();
    
    // Only the recipient can update the status
    if (swapData.toUserId !== currentUser.uid) {
      throw new Error('Unauthorized: Can only update requests sent to you');
    }

    await updateDoc(swapRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(`Failed to update swap status: ${error.message}`);
  }
};

/**
 * Delete a swap request
 * @param {string} swapId - Swap request ID
 * @returns {Promise<void>}
 */
export const deleteSwapRequest = async (swapId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: Must be logged in to delete swap request');
    }

    // Get the swap request to verify ownership
    const swapRef = doc(db, 'swaps', swapId);
    const swapSnap = await getDoc(swapRef);
    
    if (!swapSnap.exists()) {
      throw new Error('Swap request not found');
    }

    const swapData = swapSnap.data();
    
    // Only the sender can delete the request
    if (swapData.fromUserId !== currentUser.uid) {
      throw new Error('Unauthorized: Can only delete requests you sent');
    }

    await deleteDoc(swapRef);
  } catch (error) {
    throw new Error(`Failed to delete swap request: ${error.message}`);
  }
};

/**
 * Get a specific swap request by ID
 * @param {string} swapId - Swap request ID
 * @returns {Promise<Object|null>} Swap request data or null if not found
 */
export const getSwapRequest = async (swapId) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: Must be logged in to view swap request');
    }

    const swapRef = doc(db, 'swaps', swapId);
    const swapSnap = await getDoc(swapRef);
    
    if (swapSnap.exists()) {
      const swapData = swapSnap.data();
      
      // Only allow access if user is involved in the swap
      if (swapData.fromUserId === currentUser.uid || swapData.toUserId === currentUser.uid) {
        return { id: swapSnap.id, ...swapData };
      } else {
        throw new Error('Unauthorized: Can only view swaps you are involved in');
      }
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Failed to get swap request: ${error.message}`);
  }
};

/**
 * Get all swap requests for current user (both sent and received)
 * @returns {Promise<Object>} Object with sent and received requests
 */
export const getAllUserSwaps = async () => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: Must be logged in to view swaps');
    }

    const [sentRequests, receivedRequests] = await Promise.all([
      getSentRequests(currentUser.uid),
      getReceivedRequests(currentUser.uid)
    ]);

    return {
      sent: sentRequests,
      received: receivedRequests
    };
  } catch (error) {
    throw new Error(`Failed to get user swaps: ${error.message}`);
  }
}; 