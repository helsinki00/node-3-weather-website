const request = require('request')



const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiMThiY29uMDExIiwiYSI6ImNrcDVmYWJkMDBsZ24yd3Mxczd6a2ZsZDYifQ.hgtbv_MpJWnOlUK_GIzugQ&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('networks not connected')
        } else if (body.features.length === 0) {
            callback('kindly print another address')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode