import React from 'react'
import CampaignCard from './CampaignCard'

const Campaigns = ({campaignData,handleShowCampaign}) => {

   const baseURL = 'http://localhost:3001/api/campaign/upload/'

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
