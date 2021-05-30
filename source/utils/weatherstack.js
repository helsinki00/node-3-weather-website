const request = require("request")

const weatherstack = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=1fec8348c8bc95411b93613c7e389c1c&query=" + latitude + ',' + longitude + "";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('networks not connected')
        } else if (body.error) {
            callback('kindly input correct location')
        } else {
            callback(undefined,
                `${body.current.weather_descriptions} .it is ${body.current.temperature}degree and feels like ${body.current.feelslike}degree temperature`


            )
        }

    })

}

module.exports = weatherstack
