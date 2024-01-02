import React, { useEffect, useState } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
export const Coins = () => {
  const [loading,setLoading]=useState(true)
  const[coins,setCoins]=useState([])
  const[currency,setCurrency]=useState('inr')
  const currencySymbol=currency==='inr'?'₹':'$'
  useEffect(()=>{
      const getCoinsData= async()=>{
          const {data}= await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
          console.log(data);
          setCoins(data);
          setLoading(false);
      }
      getCoinsData();
  },[])
  return (
    <>
    {
       loading?<Loader/>:<>
       <Header/>
       {
        coins.map((coindata,i)=>{
          return(
            <div key={i} className="ex-cards">
            <div className="images">
            <img height={'80px'} src={coindata.image} />
            </div>
            <div className="name">
                {coindata.name}
            </div>
            <div className="price">
               {currencySymbol}{coindata.current_price.toFixed(2)}
            </div>
            <div className="rank">
                {coindata.market_cap_rank}
            </div>
        </div>
        )
        })
       }
       </>
    }
    </>
  )
}
