import { rateLimit } from '@/lib/redis';
import axios from 'axios';

export const dynamic = "force-dynamic"

export const GET=async(req:Request)=>{
    const startTime = new Date().getTime();
    try{
        const ip = req.headers.get("x-forwarded-for")??"";
        const {success,reset} = await rateLimit.limit(ip);
        if(!success){
            const now = Date.now();
            const retryAfter = Math.floor((reset-now)/1000);
            return new Response(JSON.stringify({
                message:"TOO MANY REQUEST",
                resptime:new Date().getTime()-startTime,
                isError:true,
                retryAfter:retryAfter
            }),
            {
                status:429,
                headers:{
                    ['retryAfter']:`${retryAfter}`
                }
            })
        }
        const data = await axios.get('https://ipapi.co/json');
        return new Response(JSON.stringify({
            message:"SUCCESSFULL REQUEST",
            resptime:new Date().getTime()-startTime,
            isError:false,
            retryAfter:0,
            data:data.data
        }
        ),{
            status:200,
            statusText:'Success'
        })
    }
    catch(e){
        console.log("Something went wrong",e)
        return new Response(JSON.stringify({
            message:'Something went wrong',
            isError:true,
            resptime:new Date().getTime()-startTime,
        }),{
            status:500
        })
    }
}