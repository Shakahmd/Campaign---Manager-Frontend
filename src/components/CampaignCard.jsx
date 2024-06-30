import React, { useEffect, useState ,useContext} from 'react'
import {Inset,Text,Card,Box,Button,Dialog,Flex} from '@radix-ui/themes'
import * as Switch from '@radix-ui/react-switch';

import CreateCampaign from './CreateCampaign'
import CampaignDelete from './CampaignDelete'
import {WhatsappShareButton,WhatsappIcon,FacebookShareButton,FacebookIcon} from 'react-share'
import { CampaignContext } from './CampaignContext'


const CampaignCard = ({index,campaigns,baseURL,filename,handleShowCampaign}) => {
   
    const {campaign,getSingleCampaign} = useContext(CampaignContext)

     const slug = campaigns.slug
     

     useEffect(()=>{
      getSingleCampaign(slug)
    },[])

    const shareUrl  = `http://localhost:5173/c/${slug}`
   
   
    

  return (
    <div key={index}>
       
    <Text as='div' size='4'className='flex justify-center'>{campaigns.title}</Text>
     <Box maxWidth="240px" >
         <Card size="2" className='w-96 h-400px mx-5'>
           <Inset clip="padding-box" side="top" pb="current">
            {console.log(campaigns.bg_image)}
            {console.log(`${baseURL}${campaigns.bg_image}`)}
            {console.log(`${baseURL}${filename}`)}
             <img
               src={`${baseURL}${filename}`}
               alt="campaignImage"
               style={{
                 display: 'block',
                 objectFit: 'cover',
                 width: '100%',
                 height: 340,
                 backgroundColor: 'var(--gray-5)',
               }}
             />
           </Inset>
              <div className='flex flex-row justify-between'>
              <CreateCampaign 
            ButtonText='Edit'
            showEditForm={true}
            campaigns = {campaigns}
            baseURL={baseURL}
            filename={filename}
            handleShowCampaign={handleShowCampaign}
            // active={active}
          
           />
              <div className='flex justify-between my-2'>
                <WhatsappShareButton className='mx-3' url={shareUrl}>
                   <WhatsappIcon   size={32} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton>
                   <FacebookIcon size={32} round={true} url={shareUrl} />
                </FacebookShareButton>
              </div>
              
               <CampaignDelete campaigns={campaigns} handleShowCampaign={handleShowCampaign}/>
              </div>
           
            
         </Card>
       </Box>
   
   </div>
  )
}

export default CampaignCard
