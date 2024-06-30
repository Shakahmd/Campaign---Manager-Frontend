import React from 'react'
import { useNavigate } from 'react-router-dom'
import OngoingCampaigns from './OngoingCampaigns'
import { Grid } from '@radix-ui/themes'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CampaignInLandingPage = ({activeCampaignsData}) => {
  const navigate = useNavigate()

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
   

  return (
   
    <div className='mx-7 my-7'>
     
     <Slider {...settings}>
        {activeCampaignsData.map((campaigns, index) => {
          console.log(campaigns.bg_image)
          return (
           
               <OngoingCampaigns 
              key={index}
              campaignImage={campaigns.bg_image}
              title={campaigns.title}
              slug={campaigns.slug}
            />
          
           
          )
        })}
         </Slider>
 
     
    </div>

  
  )
}

export default CampaignInLandingPage