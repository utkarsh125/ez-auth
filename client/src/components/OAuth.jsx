import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

import { app } from '../firebase';
import { useDispatch } from 'react-redux';

export default function OAuth() {

  const dispatch = useDispatch();

  const handleGoogleClick = async() =>{
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      })
      // console.log(result);
      const data = await res.json();
      dispatch(signInSuccess(data));
    }catch(error){
      console.log("Could not login with Google", error);
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
      Continue with Google
    </button>
  )
}
