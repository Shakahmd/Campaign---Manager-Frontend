import React,{useEffect, useState,useContext} from 'react'
import { Card} from '@radix-ui/themes'
import { AspectRatio } from '@radix-ui/themes'
import ImageCropper from './ImageCropper'
import { CampaignContext } from './CampaignContext'
import { useParams } from 'react-router-dom'



const User = () => {
    
   
  const {campaign,getSingleCampaign} = useContext(CampaignContext)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
       const {slug} = useParams()
        
       useEffect(()=>{
        getSingleCampaign(slug)
        
      },[])
  
      const imageName = campaign.bg_image

    const baseURL = `${baseUrl}/campaign/upload/`

      
   

    

  return (
    <div className='flex justify-center mt-9'>
        <div>
    
      
     </div>
     <div className='w-1/3  shadow mt-4 '>
     <Card className='h-full'>
     <AspectRatio ratio={2 / 2}>
  <img
    src={`${baseURL}${imageName}`}
    alt="A house in a forest"
    style={{
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      borderRadius: 'var(--radius-2)',
    }}
  />
</AspectRatio>
     
      <ImageCropper cropWidth={campaign.fg_image_width}
          cropHeight={campaign.fg_image_height} campaignid={campaign._id} textFontSize = {campaign.text_font_size}
          slug= {slug}/>
      
      
     </Card>
   
</div>   
</div>
      
    

    

  )
}

export default User
