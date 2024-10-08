import React, { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import { Text } from '@radix-ui/themes';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';



const SignIn= ({handleRegistration}) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const[fullname,setFullname] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
     
  const navigate = useNavigate()
   

   const handleFullnameChange = ({target})=>{
      setFullname(target.value)
   }

   const handleEmailChange =({target})=>{
    setEmail(target.value)
   }

   const handlePasswordChange=({target})=>{
    setPassword(target.value)
   }

   const handleSubmit = async()=>{
    try {
      const response = await axios.post(`${baseURL}/user/login`,{
        fullname,
        email,
        password
      })

      console.log('login sucessfull',response.data.message)
     
      const{token} = response.data
      localStorage.setItem('token',token)
      handleRegistration()
      toast.success('Login Successfull',)
      
      
      
      
      
    } catch (error) {
       console.error('login failed !',error)
       toast.error(error.response.data.message)
    }
 

   }
  return (
    <div className='mr-4 '>
       <Dialog.Root>
          <Dialog.Trigger asChild>
            <div>
            <Button>Sign-In</Button>
            </div>
           </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 animation-enter-done" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-450px w-90vw max-h-85vh p-6">
              <Dialog.Title className="m-0 font-medium text-mauve-12 text-base">Sign-in Below</Dialog.Title>
              <br/>
             <fieldset className="flex gap-5 items-center mb-4">
                <label className="text-right w-20 text-violet-11l" htmlFor="name">
                  FullName
                </label>
                <input className="w-full flex items-center justify-center rounded-md px-3 text-violet-11 shadow-input-focus h-9  border border-gray-300" id="name"
                value={fullname}
                onChange={handleFullnameChange}/>
              </fieldset>
              <fieldset className="flex gap-5 items-center mb-4">
                <label className="text-right w-20 text-violet-11" htmlFor="username">
                  Email
                </label>
                <input className="w-full flex items-center justify-center rounded-md px-3 text-violet-11 shadow-input-focus h-9  border border-gray-300" id="username"
                value={email}
                onChange={handleEmailChange} />
              </fieldset>
              <fieldset className="flex gap-5 items-center mb-4">
                <label className="text-right w-20 text-violet-11" htmlFor="username">
                  Password
                </label>
                <input className="w-full flex items-center justify-center rounded-md px-3 text-violet-11 shadow-input-focus h-9  border border-gray-300" id="username" type="password"
                value={password}
                onChange={handlePasswordChange} />
              </fieldset>
              <div className="flex justify-end mt-5">
                <Dialog.Close asChild>
                <Button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
                  onClick={handleSubmit}>Sign-In</Button>
                   
                  
                
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="font-sans rounded-full h-6 w-6 flex items-center justify-center text-violet-11 absolute top-2 right-2" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Text as="div" size="2" mb="1" weight="bold">
         
          <Toaster  position="top-center"/>
        </Text>
    </div>
  )
}

export default SignIn
