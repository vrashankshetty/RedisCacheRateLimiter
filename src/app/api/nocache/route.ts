import axios from 'axios';


export const GET=async()=>{
    const startTime = new Date().getTime();
    try{
        const data = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return new Response(JSON.stringify(
            {
                resptime:new Date().getTime()-startTime,
                message:'DATA FROM ENDPOINT',
                isError:false,
                data:[...data.data]
            }
        ),{
            status:200,
            statusText:'Success'
        })
    }
    catch(e){
        console.log("Something went wrong",e)
        return new Response(JSON.stringify({
            resptime:new Date().getTime()-startTime,
            message:'Something went wrong',
            isError:true,
            data:[]
        }),{
            status:500
        })
    }
}