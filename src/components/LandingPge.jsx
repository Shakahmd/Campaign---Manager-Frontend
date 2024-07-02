import React, { useState,useEffect } from 'react'
import { Button,Heading } from '@radix-ui/themes'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast'
import logo from '../assets/logo.svg'
import CampaignInLandingPage from './CampaignInLandingPage'
import axios from 'axios'


const LandingPge = () => {
     
     const[tokenTimeOut,setTokenTimeOut] =  useState(false)
     const [activeCampaignsData,setActiveCampaignsData] = useState([])
     const navigate = useNavigate()


     const isTokenExpired = (token)=>{
      if(!token){
        return true
       }
       const payload = JSON.parse(atob(token.split('.')[1]));
       console.log(payload)
       const now = new Date()
       console.log(now)
       const iat = payload.iat
       const exp = payload.exp
       const issued = new Date(iat * 1000)
       const expired = new Date(exp * 1000)
       console.log(issued)
       console.log(expired)
       if(now > expired){
         localStorage.clear()
         return true
       }else{
        return false
       }
        
      
    
       
        
  }


     const handleRegistration = ()=>{
        const verify = localStorage.getItem('token')
        if(isTokenExpired(verify)=== true){
          
          setTokenTimeOut(true)
          
          toast.error('Please do a sign-In or Sign-up')
           
        }else{
          
          navigate('/dashboard')
        }
       
     }
     useEffect(() => {
      const getCampaignsForOngoing = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/campaign')
          const activeCampaignsData = response.data
         
          setActiveCampaignsData(activeCampaignsData)
        } catch (error) {
          console.error('Error in fetching data', error)
        }
      }
    
      getCampaignsForOngoing()
    }, [])
     


  return (
    <div>
     <div>
      <Navbar tokenTimeOut={tokenTimeOut} handleRegistration ={handleRegistration}/>
     

       <div className='flex justify-between mt-4 mx-5 '>
       <div className='w-1/2 h-auto'>
        <Heading size='9'>Start Your Campaign Journey,With Us.</Heading>

        <div className='mt-5'>
        <Button onClick={handleRegistration}>Create</Button>
        </div>
        
        </div>
        <div>
        <img src={logo}/>
        </div>
        </div>

        <div className='mt-5'>
          <Heading weight='medium' align='center' size='7'>Ongoing Campaigns</Heading>
          <div>
          
           <CampaignInLandingPage activeCampaignsData = {activeCampaignsData}/>
          
          </div>

          <div className='mt-8'>
          
            <p> footer content need to show here  </p>
          </div>
        </div>
      
    </div>
    <Toaster/>
    </div>
     
  )
}

export default LandingPge
