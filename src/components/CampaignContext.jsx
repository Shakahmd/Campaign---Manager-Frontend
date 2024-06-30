import React,{createContext,useState} from 'react'
import axios from 'axios'

const CampaignContext = createContext()

const CampaignProvider = ({children})=>{
      const[campaign,setCampaign] = useState({})
      const getSingleCampaign = async(slug)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/campaign/view/${slug}`)
              console.log(response.data)
              setCampaign(response.data)
        } catch (error) {
             console.log(error)
        }
      }
   return(
    <CampaignContext.Provider value={{campaign,getSingleCampaign}}>
        {children}
    </CampaignContext.Provider>
   )   
  
}

export{
    CampaignContext,
    CampaignProvider
}
