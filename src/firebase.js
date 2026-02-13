import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4woEevaPGv7PUHOQrxehVYiEaIXcyq6s",
  authDomain: "dbangles-94906.firebaseapp.com",
  projectId: "dbangles-94906",
  storageBucket: "dbangles-94906.appspot.com",
  messagingSenderId: "691280572993",
  appId: "1:691280572993:web:c96e17a2d935f55b6bccc0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Add better error handling for auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
  } else {
    console.log("User is signed out");
  }
}, (error) => {
  console.error("Auth state change error:", error);
});

// Global error handler for uncaught Firebase errors
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.code?.startsWith('auth/')) {
    console.warn('Firebase Auth Error caught:', event.reason);
    // Prevent default error logging for known Firebase auth errors
    event.preventDefault();
  }
});
