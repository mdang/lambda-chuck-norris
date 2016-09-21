'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var response = {
        text: 'Chuck Norris has already been to Mars; that\'s why there are no signs of life.'
    }
    callback(null, response);
};
