#!/usr/bin/env node

/**
 * Firebase Backend Setup Script
 * This script helps validate your Firebase configuration and test the backend
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Firebase Backend Setup Validation\n');

// Check if .env file exists
const envPath = join(__dirname, '..', '.env');
if (!existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create a .env file with your Firebase configuration:');
  console.log(`
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
  `);
  process.exit(1);
}

// Read and validate .env file
try {
  const envContent = readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !envVars[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    process.exit(1);
  }

  console.log('✅ Environment variables configured');
  console.log(`📋 Project ID: ${envVars.VITE_FIREBASE_PROJECT_ID}`);

} catch (error) {
  console.log('❌ Error reading .env file:', error.message);
  process.exit(1);
}

// Check if package.json exists and has required dependencies
const packagePath = join(__dirname, '..', 'package.json');
if (!existsSync(packagePath)) {
  console.log('❌ package.json not found!');
  console.log('📝 Please run: npm install');
  process.exit(1);
}

try {
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  const requiredDeps = ['firebase'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies?.[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:');
    missingDeps.forEach(dep => console.log(`   - ${dep}`));
    console.log('📝 Please run: npm install');
    process.exit(1);
  }

  console.log('✅ Dependencies installed');
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  process.exit(1);
}

// Check if Firebase config file exists
const configPath = join(__dirname, '..', 'firebase', 'config.js');
if (!existsSync(configPath)) {
  console.log('❌ Firebase config file not found!');
  process.exit(1);
}

console.log('✅ Firebase config file exists');

// Check if services exist
const servicesPath = join(__dirname, '..', 'services');
const requiredServices = ['authService.js', 'profileService.js', 'swapService.js', 'index.js'];

for (const service of requiredServices) {
  const servicePath = join(servicesPath, service);
  if (!existsSync(servicePath)) {
    console.log(`❌ Service file not found: ${service}`);
    process.exit(1);
  }
}

console.log('✅ All service files exist');

// Check if Firestore rules exist
const rulesPath = join(__dirname, '..', 'firestore.rules');
if (!existsSync(rulesPath)) {
  console.log('❌ Firestore rules file not found!');
  process.exit(1);
}

console.log('✅ Firestore rules file exists');

console.log('\n🎉 Setup validation completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Run: firebase login');
console.log('2. Run: firebase init');
console.log('3. Run: firebase deploy --only firestore:rules,firestore:indexes');
console.log('4. Test your backend with: node test-backend.js');
console.log('\n📖 For detailed instructions, see SETUP_GUIDE.md'); 