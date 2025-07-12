# 🚀 Quick Start Guide

## Essential Commands

### 1. Initial Setup
```bash
# Install dependencies
npm install

# Validate setup
npm run setup

# Install Firebase CLI globally
npm install -g firebase-tools
```

### 2. Firebase Configuration
```bash
# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy security rules
firebase deploy --only firestore:rules,firestore:indexes
```

### 3. Development
```bash
# Start development server
npm run dev

# Test backend
npm run test

# Build for production
npm run build
```

### 4. Deployment
```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy everything
firebase deploy
```

## Environment Variables (.env)
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Quick Test
```javascript
// test-backend.js
import { registerUser, createOrUpdateProfile } from './services/index.js';

// Test registration
const user = await registerUser('test@example.com', 'TestPass123', 'Test User');

// Test profile creation
await createOrUpdateProfile(user.user.uid, {
  name: 'Test User',
  location: 'Test City',
  skillsOffered: ['JavaScript'],
  skillsWanted: ['Python'],
  availability: ['Weekends'],
  isPublic: true
});
```

## React Integration
```jsx
import { registerUser, loginUser, getCurrentUser } from './services/index.js';

// Register
await registerUser(email, password, name);

// Login
await loginUser(email, password);

// Get current user
const user = getCurrentUser();
```

## Common Issues

### Environment Variables Not Working
- Restart dev server after adding `.env`
- Check variable names start with `VITE_`
- Verify `.env` file is in project root

### Firebase Rules Deployment Fails
- Ensure you're logged in: `firebase login`
- Check project selection: `firebase use your-project-id`
- Verify rules syntax in `firestore.rules`

### Authentication Errors
- Enable Email/Password in Firebase Console
- Verify Firebase config in `.env`
- Check project ID matches

## Support
- 📖 Full Setup Guide: `SETUP_GUIDE.md`
- 🔧 Setup Validation: `npm run setup`
- 🧪 Backend Testing: `npm run test`
- 📚 Firebase Docs: https://firebase.google.com/docs 