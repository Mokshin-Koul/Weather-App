const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoLocation = require('./utils/geoLocation');
const getWeather = require('./utils/getWeather');
const app = express();

const publicDirectory = path.join(__dirname,'../public'); //we need to provide the absolute path and not the relative path
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewsDirectory);
hbs.registerPartials(partialsDirectory);
app.use(express.static(publicDirectory));

// app.get('',(req,res) => {
//     //res.send('This is the home page!!');
//     res.send('<h1>HomePage</h1>')
// })

// app.get('/about',(req,res) => {
//     res.send('This page gives the info about the website');
// })

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        createdBy: 'Mokshin Koul'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        createdBy: 'Mokshin Koul'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a place name to be searched'
        })
    }
    geoLocation.geoLocation(req.query.address,(geoError,coordinates) => {
        if(geoError) {
            return res.send({error: geoError})
        }
        getWeather.getWeather({latitude: coordinates.latitude,longitude: coordinates.longitude},(weatherError,weatherData) => {
            if(weatherError) {
                return res.send({error: weatherError});
            }
            res.send({
                forecast: {
                    temperature: weatherData.temp,
                    humidity: weatherData.humidity
                },
                location: coordinates.location,
            })
        })
    })
});

app.get('/help/*',(req,res) => {
    res.render('helpError',{
        title: 'Help error Page',
        errorMsg: 'This help route could not be found'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'Please provide a search value'
        })
    }
    res.send({
        products: []
    })
})

app.get('*',(req,res) => {
    res.render('404error',{
        errorMsg: 'The website you searched for is not found!!!',
        title: '404 Error page'
    })
})

app.listen(3000,() => {
    console.log('starting the server at port 3000');
})