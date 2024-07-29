import React from 'react'
import useGlobalContext from '../context/GlobalContext'
import { IoIosCloseCircleOutline } from "react-icons/io";

const Error = () => {
  return (
    <div className='err-page'>
      <div>
        <IoIosCloseCircleOutline/>
      </div>
      <h1>Oops!</h1>
      <p>Something Went Wrong Refresh The Page</p>
    </div>
  )
}

export default Error