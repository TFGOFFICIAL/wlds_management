import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './../firebase'
import { db } from './../firebase'
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [singleDoc, setSingleDoc] = useState({});

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }    

    useEffect(() => {
        

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const getUserInDb = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                setSingleDoc(doc.data());
            });
        });

        

        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <UserContext.Provider value={{user, singleDoc, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}