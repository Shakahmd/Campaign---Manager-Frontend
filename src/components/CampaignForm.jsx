import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Dialog, TextField, TextArea } from '@radix-ui/themes';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'
import EventCard from './EventCard';




const CampaignForm = ({
 
  DialogTitle = 'Fill Below',
  Description = "Please give the details",
  placeholder = {
    placeholder1: "Enter your campaign details",
    placeholder2: "Describe your event..."
  },
  open,
  onOpenChange,
  campaigns,
  baseURL,
  filename,
  handleShowCampaign,

  

 
 
 
}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const [title, setTitle] = useState( campaigns ? campaigns.title:'');
  const [description, setDescription] = useState(campaigns ? campaigns.description:'');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(campaigns ? `${baseURL}${filename}`:'');
  const [maxxWidth, setMaxWidth] = useState('455px');
  const [textInfo, setTextInfo] = useState(campaigns ? {
    fontSize: campaigns.text_font_size,
    textColor: campaigns.text_font_color,
    x: campaigns.text_position?.x,
    y: campaigns.text_position?.y
  } : {});
  const [showAddText, setShowAddText] = useState(false);
  const[selectEditImage,setSelectEditImage] = useState(false)
  const[activeValue,setActiveValue] = useState(campaigns ? campaigns.active:true)
  
  

  const handleActiveStatus = ({target}) =>{
         setActiveValue(target.value === 'activeOn')
  }

  const handleEditImage=({target})=>{
       setSelectEditImage(target.checked)

  }
  const handleTextField = ({ target }) => {
    setShowAddText(target.checked);
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(image);
    }
   
  }, [image]);
  console.log(image)

  useEffect(() => {
    if (imageUrl) {
      const imageElement = new Image();
      imageElement.src = imageUrl;
      imageElement.onload = () => {
        setMaxWidth(`${imageElement.width}px`);
      };
    }
  }, [imageUrl]);

  const handleTargetInfo = (targetInfo) => {
    setTextInfo(targetInfo);
  };


  const handleSubmitCampaign = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission
      
      const formData = new FormData();
      formData.append('bg_image', image);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('text_font_size', textInfo.fontSize);
      formData.append('text_font_color', textInfo.textColor);
      formData.append('active',activeValue)
      formData.append('text_position', JSON.stringify({
        x: textInfo.x,
        y: textInfo.y
      })
    );

      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please do sign-in or sign-up')
        
        return;
      }

      const response = await axios.post(`${baseUrl}/campaign/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        }
     
         
      });
       console.log(response.data.message)
        if(response.status === 200){
          toast.success('Campaign created successfully !')
          handleShowCampaign()
          onOpenChange(false)

        }else{
          toast.error('Failed to update the campaign')
        }
       
      
    
     
       
    
     

    } catch (error) {
      console.log(error)
     toast.error('failed to create a campaign')
    }
  };

    




   const handleUpdateCampaign = async(event)=>{
    try {
       event.preventDefault()
      const formData  = new FormData()
       formData.append('id',campaigns._id)

     if(image !== campaigns.bg_image) formData.append('bg_image',image)
     if(title !== campaigns.title) formData.append('title',title)
      if(description !== campaigns.description)formData.append('description', description);
     if(textInfo.fontSize !== campaigns.text_font_size) formData.append('text_font_size', textInfo.fontSize);
      if(textInfo.textColor !== campaigns.text_font_color)formData.append('text_font_color', textInfo.textColor);
     if(activeValue !== campaigns.active) formData.append('active',activeValue)
     if(textInfo.x !== campaigns.text_position.x ||textInfo.y !== campaigns.text_position.y ) formData.append('text_position', JSON.stringify({
        x: textInfo.x,
        y: textInfo.y
      }));

      const response = await axios.put(`${baseUrl}/campaign/edit`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })

       console.log(response.data.message)
       if(response.status === 200){
        toast.success('Campaign updated Successfully')
        handleShowCampaign()
      
        onOpenChange(false)
       }else{
        toast.error('Failed to update the campaign')
       }
       
       
       
      
         

      
    } catch (error) {
      console.error(error)
       toast.error('Failed to update the campaign')
      
    }
   }

  return (
    

    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: maxxWidth }}>
        <Dialog.Title>{DialogTitle}</Dialog.Title>
        <Dialog.Description size="2" mb="4">{Description}</Dialog.Description>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">Title</Text>
            <TextField.Input placeholder={placeholder.placeholder1} value={title} onChange={handleTitleChange} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">Description</Text>
            <TextArea placeholder={placeholder.placeholder2} value={description} onChange={handleDescriptionChange} />
          </label>
          {campaigns ? (
     <div>
    <label>
      <input type='checkbox' onChange={handleEditImage} checked={selectEditImage} />
      <Text as='label' size="2" mb="1" weight="regular" className='mx-2' >Change the Image</Text>
    </label>
    {selectEditImage && (
      <label>
        <Text as="div" size="2" mb="1" weight="bold">Image</Text>
        <TextField.Input type="file" placeholder="Choose File" className='py-1' onChange={handleImageChange} />
       
      </label>
    )}
  </div>
) : (
  <label>
    <Text as="div" size="2" mb="1" weight="bold">Image</Text>
    <TextField.Input type="file" placeholder="Choose File" className='py-1' onChange={handleImageChange} />
    
  </label>
)}
       <label>
            <input type='checkbox' onChange={handleTextField} />
            <Text as='label' size="2" mb="1" weight="regular" className='mx-2'>{campaigns ? "Edit Text":"Add Text"}</Text>
          </label>
           <div>
          <Text as='label' size="2" mb="1" weight="bold" className='mx-2'>Campaign Active Status:</Text>
          <label htmlfor = "aciveOn">
          <Text as='label'  size="2" mb="1" weight="regular" className='mx-2' >Active On</Text>
          
            <input  type='radio' id = "activeOn" value='activeOn' checked = {activeValue === true} onChange={handleActiveStatus}/>

          </label>
          <label htmlfor = "aciveOff">
          <Text as='label'  size="2" mb="1" weight="regular" className='mx-2' value={activeValue} >Active Off</Text>

            <input type='radio'  id = "activeOff" value='activeOff' checked = {activeValue === false} onChange={handleActiveStatus}/>

          </label>
          </div>
          {showAddText && (
            <EventCard imageUrl={imageUrl} onTargetInfo={handleTargetInfo} campaigns={campaigns}/>
          )}
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          
         <div>
         <Button
            
            onClick={ campaigns ? handleUpdateCampaign:handleSubmitCampaign}
          >
           {campaigns ? 'Update':'Done' }
          </Button> 
         </div>
         
          <Dialog.Close asChild>
            <div>
            <Button>Cancel</Button>
            </div>
           
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
      
      <Toaster />
      
   
    </Dialog.Root>
    
  );
};

export default CampaignForm;
