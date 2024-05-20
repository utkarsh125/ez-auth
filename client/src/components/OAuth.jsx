import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from '../firebase';

export default function OAuth() {

  const handleGoogleClick = async() =>{
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
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
