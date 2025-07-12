# Firebase Backend Setup Guide

## Step 1: Set up Firebase Project in the Firebase Console

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter a project name (e.g., "skill-swap-app")
4. Choose whether to enable Google Analytics (recommended)
5. Click **"Create project"**

### 1.2 Enable Authentication
1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click **"Email/Password"** and enable it
5. Click **"Save"**

### 1.3 Create Firestore Database
1. Go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a location closest to your users
5. Click **"Done"**

### 1.4 Add Web App
1. Click the gear icon ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the web icon (</>) to add a web app
5. Enter app nickname (e.g., "skill-swap-web")
6. Click **"Register app"**
7. **Copy the Firebase configuration object** - you'll need this for the next step

## Step 2: Add Environment Variables

### 2.1 Create .env file
Create a `.env` file in your project root with the following content:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Replace the values with your actual Firebase configuration from Step 1.4**

### 2.2 Example .env file:
```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
VITE_FIREBASE_AUTH_DOMAIN=skill-swap-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=skill-swap-app
VITE_FIREBASE_STORAGE_BUCKET=skill-swap-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## Step 3: Install Dependencies

### 3.1 Install Node.js dependencies
```bash
npm install
```

### 3.2 Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### 3.3 Login to Firebase
```bash
firebase login
```

## Step 4: Deploy Security Rules

### 4.1 Initialize Firebase in your project
```bash
firebase init
```

**Select the following options:**
- Choose **Firestore** and **Hosting**
- Select your Firebase project
- Use default file names for rules and indexes
- Set public directory to `dist`
- Configure as single-page app: **Yes**
- Don't overwrite existing files

### 4.2 Deploy Firestore rules and indexes
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 4.3 Verify deployment
- Go to Firebase Console → Firestore Database
- Check that the rules are applied
- Test with the Firebase Console

## Step 5: Test the Backend

### 5.1 Create a test file
Create `test-backend.js` in your project root:

```javascript
import { 
  registerUser, 
  loginUser, 
  createOrUpdateProfile,
  getPublicProfiles 
} from './services/index.js';

// Test the backend (run with Node.js)
async function testBackend() {
  try {
    console.log('Testing Firebase backend...');
    
    // Test registration
    const userCredential = await registerUser('test@example.com', 'TestPass123', 'Test User');
    console.log('✅ User registered:', userCredential.user.uid);
    
    // Test profile creation
    const profileData = {
      name: 'Test User',
      location: 'Test City',
      photoUrl: 'https://example.com/photo.jpg',
      skillsOffered: ['JavaScript', 'React'],
      skillsWanted: ['Python', 'Machine Learning'],
      availability: ['Weekends'],
      isPublic: true
    };
    
    await createOrUpdateProfile(userCredential.user.uid, profileData);
    console.log('✅ Profile created');
    
    // Test getting public profiles
    const profiles = await getPublicProfiles();
    console.log('✅ Public profiles retrieved:', profiles.length);
    
    console.log('🎉 Backend test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBackend();
```

### 5.2 Run the test
```bash
node test-backend.js
```

## Step 6: Integrate with React Frontend

### 6.1 Install Firebase in your React project
```bash
cd ../your-react-frontend
npm install firebase
```

### 6.2 Copy Firebase config
Copy the `firebase/` folder and `services/` folder to your React project.

### 6.3 Create environment variables in React project
Create `.env` file in your React project root with the same Firebase configuration.

### 6.4 Example React component usage

```jsx
import React, { useState, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser,
  createOrUpdateProfile,
  getPublicProfiles 
} from './services/index.js';

function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async (email, password, name) => {
    try {
      await registerUser(email, password, name);
      console.log('User registered successfully');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password);
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const loadProfiles = async () => {
    try {
      const publicProfiles = await getPublicProfiles();
      setProfiles(publicProfiles);
    } catch (error) {
      console.error('Failed to load profiles:', error.message);
    }
  };

  return (
    <div>
      <h1>Skill Swap App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={loadProfiles}>Load Profiles</button>
          <div>
            {profiles.map(profile => (
              <div key={profile.id}>
                <h3>{profile.name}</h3>
                <p>Location: {profile.location}</p>
                <p>Skills Offered: {profile.skillsOffered.join(', ')}</p>
                <p>Skills Wanted: {profile.skillsWanted.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Login or Register</h2>
          {/* Add your login/register forms here */}
        </div>
      )}
    </div>
  );
}

export default App;
```

## Step 7: Deploy to Firebase Hosting

### 7.1 Build your React app
```bash
npm run build
```

### 7.2 Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### 7.3 Your app will be available at:
`https://your-project-id.web.app`

## Troubleshooting

### Common Issues:

1. **Environment variables not working**
   - Make sure your `.env` file is in the project root
   - Restart your development server after adding `.env`
   - Check that variable names start with `VITE_`

2. **Firestore rules deployment fails**
   - Make sure you're logged into Firebase CLI
   - Check that your project is selected: `firebase use your-project-id`
   - Verify rules syntax in `firestore.rules`

3. **Authentication errors**
   - Verify Email/Password provider is enabled in Firebase Console
   - Check that your Firebase config is correct
   - Ensure you're using the right project ID

4. **CORS errors**
   - Add your domain to authorized domains in Firebase Console
   - Go to Authentication → Settings → Authorized domains

### Support:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Next Steps

1. **Customize the UI** - Build your React components
2. **Add real-time features** - Use Firestore listeners
3. **Implement file upload** - Add Firebase Storage
4. **Add notifications** - Implement Firebase Cloud Messaging
5. **Scale up** - Add more features and optimize performance 