const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { request } = require('http')
const app = express()
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)



app.get('/index', (req, res) => {
    res.render('index', {
        title: 'weather ',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'colt steele'
    })
})





app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "must provide search term"
        })

    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "provide the address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        weatherstack(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } res.send({
                forecast: forecastData,
                location,
                adderss: req.query.address

            })
        })
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: "error",
//         name: "shivam",
//         errorMessage: "message 404 not found"

//     })
// })



app.listen(port, () => {
    console.log("listening to the port " + port)
})