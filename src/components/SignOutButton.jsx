import React from 'react';
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const SignOutButton = () => {
  const handleSignOut = () => {
  

    signOut().then((result) => {
        const user = result.user;
        navigate(from, {replace: true})
      console.log('Signout successful');
    }).catch((error) => {
        const errorMsg = error.message;
        seterrorMessage("Sign Out Error")
      })
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOutButton;
