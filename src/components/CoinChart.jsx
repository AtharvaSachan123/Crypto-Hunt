import React,{useState,useEffect} from 'react'
import axios from'axios'
import {Baseurl} from './baseUrl'
import { useParams } from 'react-router-dom'
const CoinChart = () => {
    const{id}=useParams()
    const CoinChartData= async()=>{
    const{data}= await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=inr&days=365`)
    console.log(data);
    }
    useEffect(()=>{
        CoinChartData();
    })
  return (
    <div>
      
    </div>
  )
}

export default CoinChart
