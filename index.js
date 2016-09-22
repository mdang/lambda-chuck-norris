'use strict';
/* 
Return a random Chuck Norris joke with a user's name instead

Requirements: 
- AWS Lambda: https://aws.amazon.com/lambda/
- AWS API Gateway: https://aws.amazon.com/api-gateway/
- Admin privileges to your Slack team: https://[YOUR SLACK TEAM].slack.com/apps/manage

Reference: 
- https://api.slack.com
- https://api.slack.com/slash-commands
- https://github.com/awslabs/aws-serverless-chatbot-sample
- https://aws.amazon.com/blogs/aws/enter-the-aws-serverless-chatbot-competition/
- http://awschatbot.devpost.com/details/resources

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
        // Chuck Norris API
        host: 'api.icndb.com',
        // The <> turns @user_name into an actual mention
        path: '/jokes/random?firstName=<' + event.text + '>&lastName=&escape=javascript&limitTo=[nerdy]'
    }, function(response) {
        var body = '';
        
        response.on('data', function(d) {
            body += d;
        });
        
        response.on('end', function() {
            var parsed = JSON.parse(body);
            callback(null, {
                // This is the actual response shown by the bot
                text: parsed.value.joke,  
                // Make the response viewable to everyone in the channel
                response_type: 'in_channel'
            });
        });
    });
};
