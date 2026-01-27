import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
