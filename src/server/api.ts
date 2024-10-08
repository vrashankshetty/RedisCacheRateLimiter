import axios, { type AxiosError } from "axios";


const backendUrl = 'https://redis-cache-rate-limiter-4n3c.vercel.app/api';


export const getCache = async () => {
    const config = {
      method: 'GET',
      url: `${backendUrl}/cache1`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  };
  

  export const getNoCache = async () => {
    const config = {
      method: 'GET',
      url: `${backendUrl}/nocache`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  };
  

  export const getrateLimit = async () => {
    const config = {
      method: 'GET',
      url: `${backendUrl}/ratelimit`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  };