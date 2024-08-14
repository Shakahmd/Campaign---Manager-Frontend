import React,{useState} from 'react'
import { Button,AlertDialog,Flex} from '@radix-ui/themes'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'

const CampaignDelete = ({campaigns,handleShowCampaign,
 ButtonName = 'Delete',
 DialogTitle='Delete Campaign',
 DialogDescription=' Are you sure? Do you really want to delete the campaign?.',
 DialogCancel='Cancel',
 DialogAction = 'Delete',
OnClick,


}) => {
  
   const [isOpen,setIsOpen] = useState(false)
   const baseURL = import.meta.env.VITE_API_BASE_URL

  const handleCampaignDelete = async(event)=>{
    event.preventDefault()
    try {
         const id = campaigns._id
        const response = axios.delete(`${baseURL}/campaign/${id}`)
        console.log((await response).data.message)
         toast.success('Campaign deleted !')
         setIsOpen(false)
         handleShowCampaign()
         
        
        
    } catch (error) {
         console.error('Delete Campaign Failed !',error)
    }
  }
       
  return (
    <>

<AlertDialog.Root open = {isOpen} onOpenChange={setIsOpen}>
  <AlertDialog.Trigger>
    <div>
    <Button  className='hover:bg-red-500'>{ButtonName}</Button>
    </div>
   </AlertDialog.Trigger>
  <AlertDialog.Content maxWidth="450px">
    <AlertDialog.Title>{DialogTitle}</AlertDialog.Title>
    <AlertDialog.Description size="2">
     {DialogDescription}
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button className='bg-blue-500'>
          {DialogCancel}
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button className='bg-red-500' onClick={campaigns ? handleCampaignDelete:OnClick}>
          {DialogAction}
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>
<Toaster/>
 </>
  )
}

export default CampaignDelete

