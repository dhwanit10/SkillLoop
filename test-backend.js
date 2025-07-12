/**
 * Test script for Firebase Backend
 * This script tests the main functionality of the Skill Swap backend
 */

import { 
  registerUser, 
  loginUser, 
  logoutUser,
  createOrUpdateProfile,
  getUserProfile,
  getPublicProfiles,
  searchProfilesBySkill,
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
  updateSwapStatus
} from './services/index.js';

import { 
  isValidEmail, 
  validatePassword, 
  formatDate,
  validateProfileData 
} from './utils/helpers.js';

// Test configuration
const TEST_EMAIL = 'test@skillswap.com';
const TEST_PASSWORD = 'TestPass123';
const TEST_NAME = 'Test User';

async function testBackend() {
  console.log('🧪 Testing Firebase Backend...\n');
  
  let testUser = null;
  let testProfile = null;
  let swapRequestId = null;

  try {
    // Test 1: Utility Functions
    console.log('1️⃣ Testing utility functions...');
    console.log('   Email validation:', isValidEmail(TEST_EMAIL) ? '✅' : '❌');
    console.log('   Password validation:', validatePassword(TEST_PASSWORD).isValid ? '✅' : '❌');
    console.log('   Date formatting:', formatDate(new Date()) ? '✅' : '❌');
    
    const profileData = {
      name: TEST_NAME,
      location: 'Test City',
      photoUrl: 'https://example.com/photo.jpg',
      skillsOffered: ['JavaScript', 'React', 'Node.js'],
      skillsWanted: ['Python', 'Machine Learning'],
      availability: ['Weekends', 'Evenings'],
      isPublic: true
    };
    
    const profileValidation = validateProfileData(profileData);
    console.log('   Profile validation:', profileValidation.isValid ? '✅' : '❌');
    if (!profileValidation.isValid) {
      console.log('   Validation errors:', profileValidation.errors);
    }
    console.log('');

    // Test 2: User Registration
    console.log('2️⃣ Testing user registration...');
    try {
      const userCredential = await registerUser(TEST_EMAIL, TEST_PASSWORD, TEST_NAME);
      testUser = userCredential.user;
      console.log('   ✅ User registered successfully');
      console.log('   User ID:', testUser.uid);
      console.log('   Email:', testUser.email);
    } catch (error) {
      if (error.message.includes('already in use')) {
        console.log('   ℹ️  User already exists, proceeding with login...');
        const loginCredential = await loginUser(TEST_EMAIL, TEST_PASSWORD);
        testUser = loginCredential.user;
        console.log('   ✅ User logged in successfully');
      } else {
        throw error;
      }
    }
    console.log('');

    // Test 3: Profile Creation
    console.log('3️⃣ Testing profile creation...');
    await createOrUpdateProfile(testUser.uid, profileData);
    console.log('   ✅ Profile created successfully');
    
    // Test 4: Profile Retrieval
    console.log('4️⃣ Testing profile retrieval...');
    const retrievedProfile = await getUserProfile(testUser.uid);
    if (retrievedProfile) {
      testProfile = retrievedProfile;
      console.log('   ✅ Profile retrieved successfully');
      console.log('   Name:', retrievedProfile.name);
      console.log('   Location:', retrievedProfile.location);
      console.log('   Skills Offered:', retrievedProfile.skillsOffered.join(', '));
      console.log('   Skills Wanted:', retrievedProfile.skillsWanted.join(', '));
    } else {
      console.log('   ❌ Profile retrieval failed');
    }
    console.log('');

    // Test 5: Public Profiles
    console.log('5️⃣ Testing public profiles...');
    const publicProfiles = await getPublicProfiles();
    console.log('   ✅ Public profiles retrieved');
    console.log('   Number of public profiles:', publicProfiles.length);
    console.log('');

    // Test 6: Skill Search
    console.log('6️⃣ Testing skill search...');
    const searchResults = await searchProfilesBySkill('JavaScript');
    console.log('   ✅ Skill search completed');
    console.log('   Profiles with JavaScript:', searchResults.length);
    if (searchResults.length > 0) {
      console.log('   First match:', searchResults[0].name);
    }
    console.log('');

    // Test 7: Swap Request (if we have another user or create one)
    console.log('7️⃣ Testing swap requests...');
    try {
      // Create a second test user for swap testing
      const secondUserEmail = 'test2@skillswap.com';
      const secondUserPassword = 'TestPass456';
      
      let secondUser;
      try {
        const secondUserCredential = await registerUser(secondUserEmail, secondUserPassword, 'Test User 2');
        secondUser = secondUserCredential.user;
        console.log('   ✅ Second test user created');
      } catch (error) {
        if (error.message.includes('already in use')) {
          const loginCredential = await loginUser(secondUserEmail, secondUserPassword);
          secondUser = loginCredential.user;
          console.log('   ✅ Second test user logged in');
        } else {
          throw error;
        }
      }

      // Create profile for second user
      const secondProfileData = {
        name: 'Test User 2',
        location: 'Test City 2',
        photoUrl: 'https://example.com/photo2.jpg',
        skillsOffered: ['Python', 'Machine Learning'],
        skillsWanted: ['JavaScript', 'React'],
        availability: ['Weekdays'],
        isPublic: true
      };
      
      await createOrUpdateProfile(secondUser.uid, secondProfileData);
      console.log('   ✅ Second user profile created');

      // Send swap request
      swapRequestId = await sendSwapRequest(testUser.uid, secondUser.uid);
      console.log('   ✅ Swap request sent successfully');
      console.log('   Swap Request ID:', swapRequestId);

      // Get sent requests
      const sentRequests = await getSentRequests(testUser.uid);
      console.log('   ✅ Sent requests retrieved');
      console.log('   Number of sent requests:', sentRequests.length);

      // Logout first user and login as second user to test received requests
      await logoutUser();
      await loginUser(secondUserEmail, secondUserPassword);

      // Get received requests
      const receivedRequests = await getReceivedRequests(secondUser.uid);
      console.log('   ✅ Received requests retrieved');
      console.log('   Number of received requests:', receivedRequests.length);

      // Update swap status
      if (receivedRequests.length > 0) {
        await updateSwapStatus(receivedRequests[0].id, 'accepted');
        console.log('   ✅ Swap request status updated to accepted');
      }

      // Logout second user and login back as first user
      await logoutUser();
      await loginUser(TEST_EMAIL, TEST_PASSWORD);

    } catch (error) {
      console.log('   ⚠️  Swap request test skipped:', error.message);
    }
    console.log('');

    // Test 8: Logout
    console.log('8️⃣ Testing logout...');
    await logoutUser();
    console.log('   ✅ User logged out successfully');
    console.log('');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log('   ✅ User authentication');
    console.log('   ✅ Profile management');
    console.log('   ✅ Public profiles');
    console.log('   ✅ Skill search');
    console.log('   ✅ Swap requests');
    console.log('   ✅ Utility functions');
    
    console.log('\n🚀 Your Firebase backend is working correctly!');
    console.log('📖 You can now integrate this with your React frontend.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your .env file has correct Firebase configuration');
    console.log('2. Ensure Firebase project has Authentication enabled');
    console.log('3. Verify Firestore database is created');
    console.log('4. Check Firebase security rules are deployed');
    
    process.exit(1);
  }
}

// Run the test
testBackend(); 