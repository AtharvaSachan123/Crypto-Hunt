import React, { useEffect, useState } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import '../style/Exchanges.css'
import {Link} from 'react-router-dom'
export const Coins = () => {
  const [loading,setLoading]=useState(true)
  const[coins,setCoins]=useState([])
  const[currency,setCurrency]=useState('inr')
  const [search,setSearch]=useState('')
  const currencySymbol=currency==='inr'?'₹':'$'
  useEffect(()=>{
      const getCoinsData= async()=>{
          const {data}= await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
          console.log(data);
          setCoins(data);
          setLoading(false);
      }
      getCoinsData();
  },[currency])
  return (
    <>
    {
       loading?<Loader/>:<>
       <Header/>
       <div className="search-bar">
        <input type='text' 
        placeholder='Search your Coins'
        style={{height:"2rem",width:'20rem',position:'absolute',top:'1%',left:'35%',paddingLeft:'5px',borderRadius:'5px'}}
        onChange={(e)=>setSearch(e.target.value)}/>
        
       </div>
       <div className="btns">
        <button onClick={()=>setCurrency('inr')}>INR</button>
        <button onClick={()=>setCurrency('usd')}>USD</button>
       </div>
       {
        coins.filter((data)=>{
          if(data==''){
            return data
          }else if(data.name.toLowerCase().includes(search.toLocaleLowerCase())){
            return data
          }
        }).map((coindata,i)=>{
          return(
           <CoinsCard coindata={coindata} i={i} id={coindata.id} currencySymbol={currencySymbol} />
        )
        })
       }
       </>
    }
    </>
  )
}
const CoinsCard=({ coindata, i,id, currencySymbol })=>{
  const profit=coindata.price_change_percentage_24h>0
  return(
   <Link to={`/coins/${id}`} style={{color:"white",textDecoration:"none"}}>
    <div key={i} className="ex-cards">
    <div className="images">
    <img height={'80px'} src={coindata.image} />
    </div>
    <div className="name">
        {coindata.name}
    </div>
    <div className="price">
       {currencySymbol}{coindata.current_price}
    </div>
    <div style={profit?{color:"green"}:{color:"red"}} className="rank">
        {profit?"+" + coindata.price_change_percentage_24h.toFixed(2):coindata.price_change_percentage_24h.toFixed(2)}
    </div>
</div></Link>
  )
}
export default Coins