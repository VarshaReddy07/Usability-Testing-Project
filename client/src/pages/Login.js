import React from 'react';
import { githubLogo, googleLogo } from '../assets';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/storeSlice';
import { useSelector } from 'react-redux';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const userInfo = useSelector((state) => state.store.userInfo);

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged Out Successfully!');
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        {userInfo ? ( // Conditionally render the "Sign Out" button
          <button
            onClick={handleSignOut}
            className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
          >
            Sign Out
          </button>
        ) : (
          <div
            onClick={handleGoogleLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={googleLogo} alt="google" />
            <span className="text-sm text-gray-900">Sign in with Google</span>
          </div>
        )}
      </div>
      {/* Remove the code block for "Sign in with Github" */}
      {/* <div className="w-full flex items-center justify-center gap-10">
        {userInfo ? ( // Conditionally render the "Sign Out" button
          <button
            onClick={handleSignOut}
            className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
          >
            Sign Out
          </button>
        ) : (
          <div
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={githubLogo} alt="github" />
            <span className="text-sm text-gray-900">Sign in with Github</span>
          </div>
        )}
      </div> */}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
