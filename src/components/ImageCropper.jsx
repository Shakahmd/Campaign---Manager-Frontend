import React ,{useState,useEffect,useRef,useContext}from 'react'
import { Button,AlertDialog,Flex,TextFieldInput, AspectRatio, AlertDialogAction } from '@radix-ui/themes'
import axios from 'axios'
import  Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css";
import { useNavigate } from 'react-router-dom';



const ImageCropper = ({cropWidth,cropHeight,campaignid,textFontSize,slug}) => {

   

  const baseURL = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const ASPECT_RATIO = cropWidth/cropHeight
    const cropperRef = useRef()
    const[imageUrl,setImageUrl] = useState(null)
    const[crop,setCrop] = useState()
    const[error,setError] = useState('')
    const[croppedImage,setCroppedImage] = useState(null)
    const[showNameInput,setShowNameInput] = useState(false)
    const[name,setName] = useState('')
   const [showContent,setShowContent] = useState(false)
      
    
     const handleNameInput = ()=>{
         
         if(textFontSize !== "undefined"){
             setShowNameInput(true)
               
         }
     }




    const handleImageChange = ({target})=>{
        const image = target.files[0]
         console.log(image)
         if(image){
          const imageURL = URL.createObjectURL(image)
          const img = new Image()
          img.src = imageURL

          img.onload = () =>{
            const widthOfSelectedImage = img.naturalWidth
            const heightOfSelectedImage =  img.naturalHeight
            console.log('widthOfSelectedImage :',widthOfSelectedImage,'heightOfSelectedIMage :',heightOfSelectedImage)

             if(widthOfSelectedImage <  cropWidth || heightOfSelectedImage < cropHeight){
                setImageUrl('')
                setError(`The selected image dimensions (${widthOfSelectedImage} x ${heightOfSelectedImage})
                 are smaller than the required crop dimensions (${cropWidth} x ${cropHeight}). 
                Please select an image with larger dimensions to ensure proper cropping.`)
             }
           
          }
          setImageUrl(imageURL)
          
         }
         }
       

       
         const onCrop = ()=>{
          const cropper = cropperRef.current?.cropper
          console.log(cropper.getCroppedCanvas().toDataURL())
          const canvas = cropper.getCroppedCanvas()
          canvas.toBlob((blob)=>{
            if(blob){
              const file = new File([blob],'CroppedImage.png', {
                type:'image/png',
                lastModified:Date.now()
              })

              setCroppedImage(file)
            }
          })

         
         }
 
         

        
          
          const handleUploadCropImage = async()=>{
              try {
                 

                 if(!croppedImage){
                  console.error('No croppedImage is available for upload !')
                  return
                 }  
                   const formData = new FormData()
                      console.log(croppedImage)
                    formData.append('profilePicture',croppedImage)
                    formData.append('campaignId',campaignid)
                    name ? formData.append('nameText',name):null
                   const response = await axios.post(`${baseURL}/campaign/user`,formData,{
                  headers:{
                    'Content-Type':'multipart/formdata'
                  } })
                  console.log(response.data)
                  console.log("Campaign Poster from API:", response.data.campaignPoster);
                    
                 
                 
                 
                  navigate('/download',{state:{campaignPoster: response.data.campaignPoster,slug:slug}})
                 
                
                
              } catch (error) {
                console.log(error)
              }
          } 
        
          
        

     const handleCancel =()=>{
      setImageUrl('')
      setError('')
     
     }
         

  return (
    <div>
      <AlertDialog.Root >
  <AlertDialog.Trigger>
    <div>
 <Button className='mt-3' onClick={handleNameInput}>Create</Button>
    </div>
     </AlertDialog.Trigger>
  <AlertDialog.Content maxWidth="450px">
    <AlertDialog.Title>Select and Crop Image</AlertDialog.Title>
    {showNameInput && (
        <div className='mb-3' >
        <TextFieldInput type="text" placeholder="Name" className='border border-solid w-full h-9 py-2 ' onChange={(e)=>{
          setName(e.target.value)
        }}/>
        </div>
    )}
       
    
        <TextFieldInput type="file" className='border border-solid w-full h-9 py-2  ' onChange={handleImageChange}/>
        
        
        {error && <p className='text-red-500'>{error}</p>}
        {imageUrl && (
             <div className='mt-3 flex justify-center'>
               
                 <Cropper
                  src={imageUrl}
                  initialAspectRatio ={ASPECT_RATIO}
                  crop={onCrop}
                  ref={cropperRef}/>
                        
                </div>
        )}
       

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <div>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        </div>
     
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <div>
         <Button onClick={handleUploadCropImage }>
          Crop
        </Button>
           </div>
        </AlertDialog.Action>
         </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>

 
 </div>
  )
}

export default ImageCropper
