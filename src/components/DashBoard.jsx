import React,{useContext, useState} from 'react'
import {Heading,Text,Button,Flex, Grid} from '@radix-ui/themes';
import CreateCampaign from './CreateCampaign';
import Navbar from './Navbar';
import Campaigns from './Campaigns';
import axios from 'axios';




const DashBoard = () => {
  const [showCampaign,setShowCampaign] = useState(false)
  const [campaignData,setCampaignData] = useState([])


  const handleGetCampaignData = async()=>{
      try {
         const tokenId = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/api/campaign/:id`,{
          headers:{
            'Authorization': `Bearer ${tokenId}`,
          
          }
          
        })
         console.log(response.data)
          
      setCampaignData(response.data)
        
      } catch (error) {
         console.error("error fetching campaign",error)
      }
    }


        
    const handleShowCampaign = ()=>{
      setShowCampaign(true)
      handleGetCampaignData()
    }
    
  return (
    <div>
     
          <Navbar/>
         
  <div className='my-9 mx-4'>
  <Heading size="9">Build Your Social Media Campaign
  </Heading>
  {/* <img src={logo} className='mt-5'/> */}
  </div>
  <div className='flex flex-row  mt-8'>
    <div className='flex justify-between mx-4'>
    <Button className="mx-4"onClick={handleShowCampaign}>My Campaigns</Button>
    <CreateCampaign  handleShowCampaign={handleShowCampaign}/>
    </div>
     </div>
  
  <div className='flex flex-row ml-11 mt-3'>
    
    {
      showCampaign && (

        <Grid gap='4' columns='4' width='auto' >
<Campaigns campaignData={campaignData} handleShowCampaign={handleShowCampaign}/> 
        </Grid>
        
      )
    }
     </div>
   <Text size="2" mb="1" weight="bold">
        
      </Text>
    </div>
  )
}

export default DashBoard
