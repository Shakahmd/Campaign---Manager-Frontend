import React from 'react'
import CampaignCard from './CampaignCard'

const Campaigns = ({campaignData,handleShowCampaign}) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

   const baseURL = `${baseUrl}/campaign/upload/`

 return (
    <>
     {
      campaignData.map((campaigns,index)=>{
      const filename = campaigns.bg_image

        return(
          <CampaignCard index={index}
           campaigns={campaigns}
           baseURL={baseURL}
           filename={filename}
          campaignData={campaignData}
           handleShowCampaign={handleShowCampaign}/>
        )
        
      })
     }
    
    </>
  
    
 
  )
}

export default Campaigns
