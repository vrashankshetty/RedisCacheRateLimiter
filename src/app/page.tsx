/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCache, getNoCache, getrateLimit } from "@/server/api";
import { useState } from "react";
import ReactJson from 'react-json-view'




export default function Home() {
  const [cacheData,setCacheData] = useState<any>([]);
  const [resptime,setResptime] = useState(0);
  const [message,setMessage] = useState('');
  const [retryAfter,setRetryAfter] = useState(0);
  const [value,setValue] = useState('');
  const [isError,setIsError] = useState(false);
  const [ratelimitData,setRatelimitData] = useState({});

  const tryCache=async()=>{
    try{
      const data:any = await getCache();
      setResptime(data?.data?.resptime?data?.data?.resptime:0);
      setMessage(data?.data?.message);
      setIsError(data?.data?.isError);
      setCacheData(data?.data?.data);
    }catch(e){
      setCacheData([])
    }
  }


  const tryNoCache=async()=>{
    try{
      const data:any = await getNoCache();
      setResptime(data?.data?.resptime?data?.data?.resptime:0);
      setMessage(data?.data?.message);
      setIsError(data?.data?.isError);
      setCacheData(data?.data?.data);
    }catch(e){
      setCacheData([])
    }
  }


  const ratelimit=async()=>{
    try{
      const data:any = await getrateLimit();
      console.log("ratelimitdata",data)
      setResptime(data?.data?.resptime?data?.data?.resptime:0);
      setMessage(data?.data?.message);
      setRetryAfter(data?.data?.retryAfter)
      setIsError(data?.data?.isError);
      setRatelimitData(data?.data?.data);
    }catch(e){
      setRatelimitData({})
    }
  }

  console.log("cachedata",cacheData);

  return (
    <div className="w-screen items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div>
     <Tabs defaultValue="nocache" className="w-full" onValueChange={(val:string)=>{
      setValue(val);
      setCacheData([])
      setRatelimitData({})
     }}>
      <TabsList  className="bg-gray-800 mb-10 rounded-md bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-1" >
        <div>
        <TabsTrigger value="nocache" >No Cache</TabsTrigger>
        <TabsTrigger value="cache">Cache</TabsTrigger>
        <TabsTrigger value="ratelimit">Rate Limit</TabsTrigger>
        </div>
      </TabsList>
      <div className="py-5 flex flex-row justify-between">
        <div className={`flex flex-row gap-3 ${isError?'text-red-500':'text-green-500'}`}>
        <p className="">Response Time : </p>
        <p>{resptime} ms</p>
        </div>
        {value=='ratelimit'&&<div className={`flex flex-row gap-3 ${isError?'text-red-500':'text-green-500'}`}>
        <p className="">Retry After : </p>
        <p>{retryAfter} s</p>
        </div>}
        {value==='cache' && <div className={`flex flex-row gap-3`}>
          {
            message === 'DATA FROM CACHE'?
            <p className="text-green-500">STORED IN CACHE</p>:
            <p className="text-green-500">NOT STORED IN CACHE</p>
          }
        </div>}
        <div className={`flex flex-row gap-3 ${isError?'text-red-500':'text-green-500'}`}>
        <p className="">Message : </p>
        <p>{message}</p>
        </div>
      </div>
      <TabsContent value="nocache" className="w-full h-[700px] rounded-md bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-1">
        <div className="h-full bg-[#1d1f21] w-[100%]  rounded-lg p-5 overflow-y-auto relative">
         <div className="flex flex-row justify-center w-full">
          <Button className="bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-5 font-bold" onClick={tryNoCache}>Test Now</Button>
         </div>
         <ReactJson src={cacheData} theme="tomorrow"/>
        </div>
      </TabsContent>
      <TabsContent value="cache" className="w-full h-[700px] rounded-md bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-1">
        <div className="h-full bg-[#1d1f21] w-[100%]  rounded-lg p-5 overflow-y-auto relative">
         <div className="flex flex-row justify-center w-full">
          <Button className="bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-5 font-bold" onClick={tryCache}>Test Now</Button>
         </div>
         <ReactJson src={cacheData} theme="tomorrow"/>
        </div>
      </TabsContent>
      <TabsContent value="ratelimit" className="w-full h-[700px] rounded-md bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-1">
        <div className="h-full bg-[#1d1f21] w-[100%]  rounded-lg p-5 overflow-y-auto relative">
         <div className="flex flex-row justify-center w-full">
          <Button className="bg-gradient-to-r from-purple-600  via-red-500 to-yellow-500 p-5 font-bold" onClick={ratelimit}>Test Now</Button>
         </div>
         <ReactJson src={ratelimitData}  theme="tomorrow"/>
        </div>
      </TabsContent>
    </Tabs>
     </div>
    </div>
  );
}
