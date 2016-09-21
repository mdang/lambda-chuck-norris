'use strict';

var https = require('https');

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    http.get({
        host: 'api.icndb.com',
        path: '/jokes/random?firstName=Chuck&amp;lastName=Norris'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback({
                text: parsed.value.joke
            });
        });
    });
    
    callback(null, response);
};
