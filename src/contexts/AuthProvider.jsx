import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signUpWithGmail =() => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () =>{
        return signOut(auth);
    }
     useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentuser => {
        setUser(currentuser);
        setLoading(true);
        });
        return () => {
            return unsubcribe()
        }

    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        signUpWithGmail,
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider