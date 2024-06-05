import React, { useEffect, useState } from 'react'
import "./home.css"
    // setData(response.data)import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import AirIcon from '@mui/icons-material/Air';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fetchData } from './Api';

function Homepage() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("")
  const key=`41086c4a7c7a475a94074000240506`
  


  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`


  const fetchWeather=async(e)=>{
    e.preventDefault();
    try{
    const response=  await fetchData(location);
    console.log(response,"From response");
    setData(response.data)
    }
    catch(e)
    {
      // enqueueSnackbar(`Failed to delete board : ${error.message} `, { variant:'error' });
      console.log(e,"Error in fetching data");
    }
    setLocation("")
  }

  var currentdate = new Date();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  function getSuffix(date) {
    const day = date.getDate();
    if (day > 3 && day < 21) return 'th';

    switch (day % 10) {
      case 1: return st; break;
      case 2: return nd; break;
      case 3: return rd; break;

      default: return 'th';
    }
  }
  let hours = currentdate.getHours();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const suffixDate = getSuffix(currentdate)

  var datetime = daysOfWeek[currentdate.getDay() - 1] + ", " + months[(currentdate.getMonth())] + " " + currentdate.getDate() + suffixDate + " ,"
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + " " + ampm

  return (
    <div className='container'>
      <center><h1 style={{color:"black",fontSize:'2rem'}}>Weather App</h1></center>
      <>
        <form className="search" onSubmit={fetchWeather}>
          <div className="div">
            <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter Location' />
            <span onClick={fetchWeather} style={{ cursor: 'pointer' }}> <SearchIcon sx={{color:'black'}}/></span>
          </div>
        </form>
      </>
      {data.current && <div className="main">
        <div className="top">
          <div className="location">
            <LocationOnIcon />
            <p>
              {data.location ? data.location.name : ""} {" "}({data.location ? data.location.country.slice(0, 2).toUpperCase() : ""})
            </p>
          </div>
          <div className="date">
            {datetime}
          </div>
          <div className="description">
            <img src={data.current ? data.current.condition.icon : 'img not reloaded'} alt="img not reloaded" />
            <p className='bold'>
              {data.current ? data.current.condition.text : ""}
            </p>
          </div>
          <div className="temp "><h1>{data.current ? `${data.current.temp_c}°C` : ""}</h1></div>
          <div className="wind">
            <AirIcon />
            <p className='bold' style={{ marginLeft: "5px" }}> Wind is {data.current ? `${data.current.wind_mph} MPH` : ""}</p>

          </div>
        </div>
      </div>}


    </div>
  )
}

export default Homepage
