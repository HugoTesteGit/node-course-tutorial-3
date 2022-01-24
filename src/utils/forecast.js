const { encode } = require('punycode')
const request = require('request')


const geocode = (lat, long , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9b7ad69343f0622f15cc5a4597a693bf&query=' + long+','+ lat+ '&units=m'
    request({ url, json: true } , (error, {body}) => {
        if(error){
          callback('Unable to connect to location services' )
        }else if(body.error){
          callback('Unable to find location. Try another search')
        }else {
          callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degrees out, but it feels like ' + body.current.feelslike + ' degrees out there')
        }
    })
}

module.exports = geocode