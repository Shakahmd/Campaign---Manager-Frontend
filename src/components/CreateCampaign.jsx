import React, { useEffect, useState } from 'react';


import CampaignForm from './CampaignForm';
import { Button } from '@radix-ui/themes';

const CreateCampaign = ({ ButtonText = "New Campaign" ,showEditForm,campaigns,baseURL,filename,handleShowCampaign}) => {
  const placeholder ={
    placeholder1:"",
    placeholder2:""
  }


  const [showCampaignForm, setShowCampaignForm] = useState(false);

    const handleButtonClick = ()=>{
      setShowCampaignForm(true)
      
     
    }
 
  return (
    <div>
      <div>
      
        <Button  onClick={handleButtonClick} >{ButtonText}</Button>
             { showCampaignForm &&  (
             <CampaignForm
             open={showCampaignForm}
             onOpenChange={() => setShowCampaignForm(false)}
             DialogTitle={showEditForm ? "Edit Campaign":"Fill Below"}
             Description={showEditForm ? 'Edit The Details':"Please Give The Details"}
             placeholder={showEditForm && placeholder}
             campaigns={showEditForm && campaigns}
             baseURL={baseURL}
             filename={filename}
             handleShowCampaign={handleShowCampaign}
             
             
            

             />
             )}
       

      </div>
    </div>
  );
};

export default CreateCampaign;
