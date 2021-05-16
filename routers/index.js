const axios = require('axios').default
const express = require('express')
const redis = require('redis');
const {promisify} = require('util')

const cache = redis.createClient({
    port:process.env.PORT_REDIS||6379
})

const route = express.Router()

route.get('/rocket',async (req,res)=>{

    const getDataRedis = promisify(cache.get).bind(cache),
        setDataRedis = promisify(cache.setex).bind(cache);

    try {
        let key = await getDataRedis('Rocket')
        if(key){
            console.log('From Cache');
            res.status(200).json(JSON.parse(key))
        }else{
            let dataRocket = await axios.get(`https://api.spacexdata.com/v3/rockets`);
            console.log('From API');
            await setDataRedis('Rocket',10,JSON.stringify(dataRocket.data,0,2));
            res.status(200).json(dataRocket.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"ada yang salah"})
    }
})

module.exports = route