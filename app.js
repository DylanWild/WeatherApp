const hbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.engine('.hbs', hbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('view engine','.hbs')

const api = require('./place')
// const forecast = require('./forecast')


const publicDirectory = path.join(__dirname, './public')

app.use(express.static(publicDirectory))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.render('index')

})


app.get('/weather',async(req, res)=>{
    let location = req.query.location
    // let locationString = location.toString('').charAt[0].toUppercase()+ string.slice(1);

    let coordinates = await api.place(location)

  let weatherInfo =  await api.forecast(coordinates.long, coordinates.lat)
  res.render('index',`Today the weather in ${location} will be ${weatherInfo.weatherSum} 
  Rocking a temperature high of ${weatherInfo.weatherTemp} Celsuis`)




})
// app.post('/', (req, res) => {
//     let name = req.body.name;
//     console.log(name)
//     res.send(weatherInfo)
// })

app.listen(3001, ()=>{
    console.log('Been to the year 3000')
})
   












    // request({url: url, json:true}, (error, response) =>{
    //     // const data = JSON.parse(response.body)
    //     if(error){ //error if doesnt connect to dark skys api
    //         console.log("error not connecting")
    //         console.log(error)
    //     }
    //     else{
    //     const data = response.body
    //     console.log(data.currently)
    //     }
    // })
    
    







// const encoded = encodeURI(mapboxURL)



