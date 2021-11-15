import React from "react";
import {
  signOut as signUserOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../Firebase/firebase";
const AuthContext = React.createContext();

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider component");
  }
  return context;
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = React.useState();
  const [status, setStatus] = React.useState("loading");

  function signIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  }

  function signOut() {
    signUserOut(auth); // auth.signOut()
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setStatus("have user");
      } else {
        setCurrentUser(null);
        setStatus("no user");
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signOut,
    currentEmail: currentUser?.email,
    isLoading: status === "loading",
  };

  return <AuthContext.Provider value={value} {...props} />;
}
