import React from 'react'
import { Hypnosis } from 'react-cssfx-loading/lib';

const Loader = () => {
  return (
    <div className='d-flex align-items-center justify-content-center w-100' style={{height: '100vh'}}> 
        <Hypnosis color="#2b5877" width="100px" height="100px" duration="3s" />
    </div>
  )
}

export default Loader