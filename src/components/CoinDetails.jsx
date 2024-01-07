import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Baseurl } from './baseUrl'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import'../style/coinDetail.css'
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from './CoinChart'
const CoinDetails = () => {
  const[coin,setCoin]=useState([])
  const[loading,setLoading]=useState(true)
  const {id}=useParams()
  const[currency,setCurrency]=useState('inr')
  const currencySymbol=currency==='inr'?'₹':'$'
  const profit =coin.market_data?.price_change_percentage_24h>0
  useEffect(()=>{
    const getCoin=async()=>{
      try{
        const {data}= await axios.get(`${Baseurl}/coins/${id}`)
        console.log(data);
        setCoin(data);
        setLoading(false)
      }catch(error){
        console.log(error);
        setLoading(false)
      }
    }
    getCoin();
  },[])
  return (
    <>
    
    {
      loading?<Loader/>:<>
        <div className="coin-detail" style={{display:'flex',justifyContent:'space-evenly'}}>
          <div className="coin-info">
          <div className="btn">
        <button onClick={()=>setCurrency('inr')}>INR</button>
        <button onClick={()=>setCurrency('usd')}>USD</button>
       </div>
            <div className="time">
              {coin.last_updated}
            </div>
            <div className="coin-image">
              <img height={'150px'} src={coin.image.large} alt="" />
            </div>
            <div className="coin-name">
              {coin.name}
            </div>
            <div className="coin-price">
             {currencySymbol} {coin.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              {profit ?<BiSolidUpArrow color='green'/>:<BiSolidDownArrow color='red'/>}
              {coin.market_data.price_change_percentage_24h}%
            </div>
            <div className="market-rank">
              <IoPulseOutline color='orange'/>
              #{coin.market_cap_rank}
            </div>
            <div className="coin-desc">
            <p> {coin.description['en'].split('.')[0]}</p>
            </div>
          </div>
          <CoinChart currency={currency}/>
        </div>

      </>
    }
    
    </>
  )
}

export default CoinDetails
