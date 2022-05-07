const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('',(req,res) => {
  res.render('index',{
     title: 'Weather',
     name: 'Leonardo Metelys'
  })

})

app.get('/about',(req,res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Leonardo Metelys'
   })
 
 }) 

 app.get('/help',(req,res) => {
   res.render('help',{
      helpText: 'Este é o mesmo texto de Ajuda.',
      title: 'Help',
      name: 'Leonardo Metelys'
   })
 
 })


 app.get('/weather',(req,res)=> {
    if (!req.query.address) {
      return res.send({
        error:'Você deve fornecer uma url para a Pesquisa'
      })
    }

    geocode(req.query.address, (error,{ latitude, longetitude, location} = {} ) => {
       if (error) {
        return res.send({ error })
       }

       forecast(latitude,longetitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
         }

         res.send({
             forecast: forecastData,
             location,
             address: req.query.address 

         })

       })

    })
   
  }) 
    // res.send({
    //   forecast: 'Céu nublado. 30 graus',
    //   location: 'Manaus',
    //   address: req.query.address

    


 app.get('/products',(req,res)=> {
  if (!req.query.search) {
    return res.send({
      error:'Você deve fornecer um termo de Pesquisa'
    })

  }

  console.log(req.query.search)
  res.send({
    products: []
  }) 
})


 app.get('/help/*',(req,res) => {
   res.render('404', {
     title: '404',
     name: 'Leonardo Metelys',
     errorMessage: 'Artigo de ajuda não encontrado!'
   })
 })

 // Qualquer outra url não mapeada mostrará essa página 
 app.get('*',(req,res) => {
   res.render('404',{
     title: '404',
     name: 'Leonardo Metelys',
     errorMessage: 'Página não encontrada!'
   })
 })

app.listen(3000,() => {
   console.log('Server está ativo usando a porta 3000.') 
})