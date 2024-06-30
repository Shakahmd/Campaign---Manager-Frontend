import React from 'react'
import CampaignDelete from './CampaignDelete'

const SignOut = ({OnClick}) => {
  return (
    <div>
      <CampaignDelete  ButtonName = 'SignOut'
 DialogTitle='Sign-Out'
 DialogDescription=' Are you sure? Do you really want to Sign-Out?.'
 DialogCancel='Cancel'
 DialogAction = 'Sign-Out'
OnClick={OnClick}/>
    </div>
  )
}

export default SignOut
