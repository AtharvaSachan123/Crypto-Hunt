import React from 'react'
import {MagnifyingGlass} from "react-loader-spinner"
const Loader = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
       <MagnifyingGlass
  visible={true}
  height="120"
  width="120"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </div>
  )
}

export default Loader
