import React, { useState, useEffect } from 'react';
import { Flex, Heading, Dialog,Button } from '@radix-ui/themes';
import SignIn from './SignIn';
import Signup from './Signup';
import SignOut from './SignOut';
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const Navbar = ({tokenTimeOut,handleRegistration}) => {
  const navigate = useNavigate()
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
 


 


  const handleSignInAndSignUp = () => {
    // const verify = localStorage.getItem('token');
    if (tokenTimeOut === true) {
        setShowSignOut(false) 
        setShowSignIn(true)
        setShowSignUp(true)
      
     } else{
      setShowSignOut(true)
      setShowSignIn(false)
      setShowSignUp(false)
     }
    
    
     };

  const handleSignOut = () => {
    localStorage.clear();
    toast.success("You have been successfully signed out")
     setShowSignOut(false)
     setShowSignIn(true)
     setShowSignUp(true)
   
    navigate('/')

  };
   
    

  useEffect(() => {
    handleSignInAndSignUp();
  }, []);

  return (
    <div>
      <Flex className='flex justify-between mx-7 mt-3'>
        <Heading className='text-blue-500'>Campaign Creator</Heading>
        <div className='flex flex-row justify-between'>
          {showSignOut ? (<>
            <SignOut OnClick={handleSignOut}/>
           
          </>):(<>
            <Signup/>
              <SignIn handleRegistration={handleRegistration}/></>)}
          </div>
       
       
      </Flex>
      <Toaster />
    </div>
  );
};

export default Navbar;