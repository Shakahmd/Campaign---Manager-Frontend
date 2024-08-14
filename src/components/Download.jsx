import React,{useContext} from 'react'
import { Button } from '@radix-ui/themes'
import download from '../assets/download.svg'
import createnew from '../assets/createnew.svg'
import { useLocation, useNavigate } from 'react-router-dom'



const Download = () => {
  let baseURL = import.meta.env.VITE_API_BASE_URL
   baseURL.replace('/api','')
  const navigate = useNavigate()
  const location  = useLocation()
   const baseUrl = `${baseURL}/generated/`

  const uniqueName = location.state?.campaignPoster
  const slug = location.state?.slug
  // console.log(slug,'title from imagecropper')

   const handleDownload = () =>{
     if(uniqueName){
        const link = document.createElement('a')
        link.href = `${baseUrl}${uniqueName}`
        link.setAttribute("download",uniqueName)
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        

     }else{
      console.error('No campaign poster available for download')
     }
   }
  console.log('campaignnameFromDownloadPage',location.state)
  return (
    <div className='flex justify-center items-center  bg-blue-500 '>
      <div className=' w-1/2 h-dvh bg-white flex justify-center items-center'>
      <div className=' w-1/2 h-1/2 flex flex-col gap-2 justify-center items-center'>
      
        <Button className='w-full h-24 rounded-full text-2xl' onClick={handleDownload}>Download to Gallery   <img className="w-9"src={download}/></Button>
        
      
       <Button className='w-full h-24 rounded-full text-2xl' onClick={()=>navigate(`/c/${slug}`)}>Create new poster   <img className='w-9' src={createnew}/></Button>
      
       </div>
      </div>
     
    </div>
  )
}

export default Download
