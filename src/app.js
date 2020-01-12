const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app = express()
const port=process.env.PORT || 3000

const publicdirectory=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'prathyush'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'prathyush'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'prathyush'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
             error:'you must provide address'    
         })
 
     }

     geocode(req.query.address,(error,{latitude,logitude,location}={})=>{
         if(error) {
             return res.send({error})
         }

         forecast(latitude,logitude,(error,forecastData)=>{
             if(error){
                return res.send({error}) 
             }
             res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address

             })

         })

     })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({
            error:'you must provide search term'    
        })

    }
    console.log(req.query.search)

    res.send({
        products:[]
    })

})



app.get('/help/*',(req,res)=>{
    res.render('error',{
        head:'help article not found'

    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        head:'404 page not found'

    })

})



app.listen(port,()=>{
    console.log('server is up on'+port)
})