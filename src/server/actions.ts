"use server";

import { getCache, getNoCache, getrateLimit } from "./api"

export const getClientCache = async() =>{
 try{
    const data = await getCache();
    return data;
 }catch(e){
    console.log("error",e)
    return {};
 }
}



export const getClientNoCache = async() =>{
    try{
       const data = await getNoCache();
       return data;
    }catch(e){
       console.log("error",e)
       return {};
    }
   }


export const getClientRatelimit = async() =>{
    try{
       const data = await getrateLimit();
       return data;
    }catch(e){
       console.log("error",e)
       return {};
    }
   }
   
   