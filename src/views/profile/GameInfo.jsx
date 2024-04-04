import React from 'react'

function GameInfo () {
  return (
    <div className='div-profile-conainer'>
      <div className='div-profilecontent'>
        <img src="/default-profile.jpg" alt="profile" />
        <div className='profile-form-input'>
            <span className='spanFixW'>Mobile Number</span>
            <b>00000000000</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Display Name</span>
            <b>00000000000</b>
        </div>
        <br/>
        <div className='profile-form-input'>
            <span className='spanFixW'>Company Name</span>
            <b>00000000000</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Branch Name</span>
            <b>00000000000</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Registration Date</span>
            <b>00000000000</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Role</span>
            <b>00000000000</b>
        </div>
      </div>
    </div>
  )
}

export default GameInfo 
