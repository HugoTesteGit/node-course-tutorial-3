const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup standard directory to serve
app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather apps',
        name: 'Hugo Claudio'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Hugo Claudio'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'Help message to show on scree',
        title: 'Help!',
        name: 'Hugo Claudio'
    })
})





//Website/weather
 app.get('/weather' ,(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
         
            return res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
            
        })
    })
 })

//Website/weather
app.get('/products' ,(req, res) => {
    if(!req.query.search){
      return res.send({
          error: 'You must provide a search term'
      })
    }
    res.send({
      products: []
    })
 })

 app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found',
        title: '404 page',
        name: 'Hugo Claudio'
    })
  })

 //404 (percisa de ser sempre o ultimo)
 app.get('*', (req, res) => {
    res.render('404',{
        message: 'Page not found',
        title: '404 page',
        name: 'Hugo Claudio'
    })
 })

app.listen(3000, () => {
    console.log('Sever is up on port 3000.')
})