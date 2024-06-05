import axios from "axios";
const key = import.meta.env.VITE_API_KEY;



export const fetchData=async(location)=>{
    try{
        const response=await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`)
        return response
    }
    catch(e)
    {
        console.log('Error in api ',e);
    }
}