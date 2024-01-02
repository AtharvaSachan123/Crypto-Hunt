import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Baseurl } from './baseUrl'
import Loader from './Loader'

const Exchanges = () => {
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const getExchangesData= async()=>{
            const {data}= await axios.get(`${Baseurl}/exchanges`)
            console.log(data);
            setLoading(false);
        }
        getExchangesData();
    })
  return (
   <>
   {
    loading?<Loader/>:<>
    <Header/>
    <div>
        
    </div>
    
    </>

   }
   </>
  )
}

export default Exchanges
