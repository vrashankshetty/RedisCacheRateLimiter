import { redis } from "@/lib/redis"
import axios from 'axios';




export const GET=async()=>{
    const startTime = new Date().getTime();
    
    try{
       const cachedData = await redis.get('cacheData');
       if(cachedData){
        return new Response(JSON.stringify({
            resptime:new Date().getTime()-startTime,
            message:'DATA FROM CACHE',
            isError:false,
            data:cachedData
        }),{
            status:200,
            statusText:'Cached Data'
        })
       }
        const data = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log("data",data)
        await redis.set('cacheData',data.data)
        await redis.expire('cacheData',30);

        return new Response(JSON.stringify({
            resptime:new Date().getTime()-startTime,
            message:'DATA FROM ENDPOINT',
            isError:false,
            data:[
                ...data.data
            ]
        }
        ),{
            status:200,
            statusText:'Success',
            headers:{
                'Cache-Control':'no-store'
            }
        })
    }
    catch(e){
        console.log("Something went wrong",e)
        return new Response(JSON.stringify({
            message:'Something went wrong',
            isError:true,
            resptime:new Date().getTime()-startTime,
            data:[]
        }),{
            status:500
        })
    }
}