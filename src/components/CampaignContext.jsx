import React,{createContext,useState} from 'react'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
const CampaignContext = createContext()

const CampaignProvider = ({children})=>{
      const[campaign,setCampaign] = useState({})
      const getSingleCampaign = async(slug)=>{
        try {
            const response = await axios.get(`${baseURL}/campaign/view/${slug}`)
              console.log(response.data)
              setCampaign(response.data)
        } catch (error) {
             console.log(error)
        }
      }
   return(
    <CampaignContext.Provider value={{campaign,getSingleCampaign  }}>
        {children}
    </CampaignContext.Provider>
   )   
  
}

export{
    CampaignContext,
    CampaignProvider
}
