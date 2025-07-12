# Skill Swap Firebase Backend

A comprehensive Firebase backend for a Skill Swap web application using Firestore and Firebase Authentication.

## Features

- **User Authentication**: Email/password sign up and login
- **Profile Management**: Create, update, and search user profiles
- **Swap Requests**: Send, manage, and track skill swap requests
- **Security**: Comprehensive authorization and validation
- **Real-time**: Built for real-time updates with Firestore

## Project Structure

```
├── firebase/
│   └── config.js          # Firebase initialization and configuration
├── services/
│   ├── authService.js     # Authentication functions
│   ├── profileService.js  # Profile management functions
│   ├── swapService.js     # Swap request functions
│   └── index.js          # Main service exports
├── package.json
├── vite.config.js
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Add your web app to the project
5. Copy the configuration values to your `.env` file

### 4. Firestore Security Rules

Deploy the following security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles collection
    match /profiles/{userId} {
      allow read: if request.auth != null && (resource.data.isPublic == true || request.auth.uid == userId);
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Swaps collection
    match /swaps/{swapId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.fromUserId || request.auth.uid == resource.data.toUserId);
      allow create: if request.auth != null && request.auth.uid == request.resource.data.fromUserId;
    }
  }
}
```

## Usage Examples

### Authentication

```javascript
import { registerUser, loginUser, logoutUser, getCurrentUser } from './services/index.js';

// Register a new user
const userCredential = await registerUser('user@example.com', 'password123', 'John Doe');

// Login user
const loginCredential = await loginUser('user@example.com', 'password123');

// Get current user
const currentUser = getCurrentUser();

// Logout user
await logoutUser();
```

### Profile Management

```javascript
import { 
  createOrUpdateProfile, 
  getUserProfile, 
  getPublicProfiles, 
  searchProfilesBySkill 
} from './services/index.js';

// Create or update profile
const profileData = {
  name: 'John Doe',
  location: 'New York, NY',
  photoUrl: 'https://example.com/photo.jpg',
  skillsOffered: ['JavaScript', 'React', 'Node.js'],
  skillsWanted: ['Python', 'Machine Learning'],
  availability: ['Weekends', 'Evenings'],
  isPublic: true
};

await createOrUpdateProfile(currentUser.uid, profileData);

// Get user profile
const profile = await getUserProfile('user123');

// Get all public profiles
const publicProfiles = await getPublicProfiles();

// Search profiles by skill
const matchingProfiles = await searchProfilesBySkill('JavaScript');
```

### Swap Requests

```javascript
import { 
  sendSwapRequest, 
  getSentRequests, 
  getReceivedRequests, 
  updateSwapStatus 
} from './services/index.js';

// Send a swap request
const swapId = await sendSwapRequest('user123', 'user456');

// Get sent requests
const sentRequests = await getSentRequests('user123');

// Get received requests
const receivedRequests = await getReceivedRequests('user123');

// Update swap status
await updateSwapStatus('swap123', 'accepted');
```

## API Reference

### Authentication Functions

- `registerUser(email, password, displayName?)` - Register new user
- `loginUser(email, password)` - Login user
- `logoutUser()` - Logout current user
- `getCurrentUser()` - Get current authenticated user
- `onAuthStateChange(callback)` - Listen to auth state changes

### Profile Functions

- `createOrUpdateProfile(uid, profileData)` - Create or update user profile
- `getUserProfile(uid)` - Get specific user profile
- `getPublicProfiles()` - Get all public profiles
- `searchProfilesBySkill(skill)` - Search profiles by skill
- `getCurrentUserProfile()` - Get current user's profile
- `deleteUserProfile(uid)` - Delete user profile

### Swap Functions

- `sendSwapRequest(fromUserId, toUserId)` - Send swap request
- `getSentRequests(userId)` - Get sent requests
- `getReceivedRequests(userId)` - Get received requests
- `updateSwapStatus(swapId, status)` - Update swap status
- `deleteSwapRequest(swapId)` - Delete swap request
- `getSwapRequest(swapId)` - Get specific swap request
- `getAllUserSwaps()` - Get all user swaps

## Security Features

- All operations validate current user authentication
- Users can only modify their own profiles and swap requests
- Public profiles are readable by authenticated users
- Swap requests are only accessible to involved parties
- Comprehensive error handling and validation

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## License

MIT 