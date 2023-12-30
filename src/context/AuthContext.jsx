import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../auth/firabase";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/Notify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const register = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password, displayName);
      await updateProfile(auth.currentUser, { displayName });
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
      });
      navigate("/login");
      toastSuccessNotify("Registered successfully!.");
    } catch (error) {
      toastErrorNotify(error.message);
      console.log(error);
    }
  };

  const Login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
      console.log(userCredential);
    } catch (error) {}
  };

  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, photoURL, displayName } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.removeItem("user");
      }
    });
  };

  useEffect(() => {
    userObserver();
  }, []);

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Looged out successfully");
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastSuccessNotify("Please check your email");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const googleSign = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      navigate("/");
      toastSuccessNotify("Logged in successfully");
    });
  };

  const values = {
    googleSign,
    register,
    Login,
    logOut,
    currentUser,
    forgotPassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
