import React,{ createContext,useState } from "react";

const CampaignPosterContext  = createContext()

const CampaignPosterProvider = ({children}) =>{
    const[campaignPoster,setCampaignPoster] = useState('')

  

    return (
      <CampaignPosterContext.Provider value={{campaignPoster,setCampaignPoster}}>
        {children}
      </CampaignPosterContext.Provider>
    )
}

export {
    CampaignPosterProvider,
    CampaignPosterContext

}


