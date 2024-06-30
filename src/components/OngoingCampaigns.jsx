import React from 'react'
import { Box,Card,Inset,Text} from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'

const OngoingCampaigns = ({campaignImage,title,slug}) => {
   const navigate = useNavigate()
  const baseURL = 'http://localhost:3001/api/campaign/upload/'
  const shareUrl  = `/c/${slug}`

  return (
   
<Box maxWidth="240px" >
  <Card size="2" className='w-96 h-500px mx-5' onClick={()=>navigate(shareUrl)}>
    <Inset clip="padding-box" side="top" pb="current">
      <img
        src={`${baseURL}${campaignImage}`}
        alt="Bold typography"
        style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 340,
          backgroundColor: 'var(--gray-5)',
        }}
      />
    </Inset>
    <Text as="p" size="3">
     {title}
    </Text>
  </Card>
</Box>
  
  
  )
}

export default OngoingCampaigns
