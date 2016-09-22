'use strict';
/* 
Return a random Chuck Norris joke with a user's name instead

https://api.slack.com/slash-commands

Usage: 
/chuck [@user_name]
*/

console.log('Loading lambda-slackbot-chuck-norris');

// Since `http` is already built into Node, we don't need to zip up a file for deployment, 
//  we can edit it inline in the console
var http = require('http');

/*
`event` will contain all the data passed to us by Slack, for example: 

token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678    
*/
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    http.get({
        host: 'api.icndb.com',
        path: '/jokes/random?firstName=<' + event.text + '>&lastName=&escape=javascript&limitTo=[nerdy]' // The <> turns @user_name into an actual mention
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            callback(null, {
                text: parsed.value.joke,  // This is the actual response shown by the bot
                response_type: 'in_channel', // Make the response viewable to everyone in the channel
            });
        });
    });
};
