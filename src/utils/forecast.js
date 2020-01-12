const request=require('request');

const forecast = (latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/23486fcd327d255a6c130483f9d67754/'+latitude+','+ longitude;
    request({ url, json:true},(error,{body})=>{
        if(error){
            callback('please connect to the internet',undefined)
        }
        else if(body.error){
            callback('entered address is not correct',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })


}

module.exports=forecast