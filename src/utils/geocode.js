const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdGh5dXNoMTgiLCJhIjoiY2s1NDR1NGx0MGE5NjNrcWhyb2lwemNndSJ9.RVIKicZ-CQLN2lyVxvw5KA&limit=1'

    request({ url, json: true }, (error, {body}) => {

            if(error){
                callback('please connect to the internet',undefined)
            }
            else if(body.features.length===0){
                callback('entered address is not correct',undefined)
            }
            else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    logitude:body.features[0].center[0],
                    location:body.features[0].place_name

                })
            }
            
        })
}

module.exports=geocode