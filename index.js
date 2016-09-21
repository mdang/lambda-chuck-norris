'use strict';

console.log('Loading lambda-slackbot-chuck-norris');

var http = require('http');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    http.get({
        host: 'api.icndb.com',
        path: '/jokes/random?firstName=' + event.user_name.charAt(0).toUpperCase() + event.user_name.slice(1) + '&lastName=&escape=javascript'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(null, {
                text: parsed.value.joke
            });
        });
    });
};
