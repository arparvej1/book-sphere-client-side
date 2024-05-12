import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config.js";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarIcon, setAvatarIcon] = useState(false);
  const [alreadyRegister, setAlreadyRegister] = useState(false);
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [alreadyUpdate, setAlreadyUpdate] = useState(false);
  const [textDot, setTextDot] = useState('');
  const [librarians, setLibrarians] = useState([]);

  const loginCheck = () => {
    if (alreadyLogin) {
      toast.success('Login Successfully!');
      setAlreadyLogin(false);
    }
  }

  const registerCheck = () => {
    if (alreadyRegister) {
      toast.success('Registration Successfully!');
      setAlreadyRegister(false);
    }
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserInfo = (cUser, displayNameNew, photoURLNew) => {
    setLoading(true);
    return updateProfile(cUser, {
      displayName: displayNameNew,
      photoURL: photoURLNew
    });
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
    setLoading(true);
    setAvatarIcon(false);
    return signInWithPopup(auth, googleProvider);
  }

  const signInWithGithub = () => {
    setLoading(true);
    setAvatarIcon(false);
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/books`)
      .then(function (response) {
        // handle success
        setLibrarians(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

  const authInfo = {
    user,
    loading,
    avatarIcon,
    alreadyLogin,
    setAlreadyLogin,
    loginCheck,
    registerCheck,
    alreadyRegister,
    setAlreadyRegister,
    alreadyUpdate,
    setAlreadyUpdate,
    setAvatarIcon,
    setLoading,
    createUser,
    updateUserInfo,
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    logOut,
    textDot,
    setTextDot,
    librarians
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;