import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Baseurl } from './baseUrl'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import'../style/coinDetail.css'
import CoinImage from '../images/coin.png'
const CoinDetails = () => {
  const[coin,setCoin]=useState([])
  const[loading,setLoading]=useState(true)
  const {id}=useParams()
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
        <div className="coin-detail">
          <div className="coin-info">
            <div className="time">
              {coin.last_updated}
            </div>
            <div className="coin-image">
              <img height={'120px'} src={coin.image.large} alt="" />
            </div>
            <div className="coin-name">
              {coin.name}
            </div>
            <div className="coin-price">
              {coin.market_data.current_price["inr"]}
            </div>
            <div className="coin-profit">
              {coin.market_data.price_change_percentage_24h}%
            </div>
            <div className="market-rank">
              {}
            </div>
            <div className="coin-desc">
              Cheetah hi kehde
            </div>
          </div>
        </div>

      </>
    }
    
    </>
  )
}

export default CoinDetails
