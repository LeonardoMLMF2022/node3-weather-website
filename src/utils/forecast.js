const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e988b3b2fc407ed792c403db20fcee69&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url, json:true},(error,{ body}) => {
      if (error) {
          callback('Unable to conect to weather service!', undefined)
      } else if (body.error) {
          callback('Unable to find location!!.',undefined)
      } else {
        callback(undefined,body.current.weather_descriptions[0] +  '. A temperatura atual é de ' + body.current.temperature + ' graus. A sensação térmica é de ' +body.current.feelslike + '%.')                
      }
    })
}

module.exports = forecast