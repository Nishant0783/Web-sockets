/*
    This is how we setup a basic websocket server.
    In javscript we use 'ws' library to setup web server.
*/


const ws = require('ws')

/*
    => Using this line we create a websocket server, where 'Server' is a constructor of     'Server' which accepts configuration options for the server. 
    => For the basic configuration we passed port number as a configuration object.

*/
const server = new ws.Server({ port: '3000' })

/*
    => server.on is method which listens for an event. This method takes two arguments 
        i) event: It is the event for which server needs to listen.
        ii) listener: It is a callback which has a logic to listen to the event.
    => This method returns an object which is the server instance.
    => First 'on' method listen for 'connection' event and an socket object is created for this connection. This object represents the communication channel between the server and the client.
    => Inside callback we can setup various event listeners on socket object to handle different types of events. One of those events is "message"
*/
server.on('connection', socket => {
    socket.on('message', message => {
        /*
            => If we directly log the message without using "Buffer" then we can see that we are getting a <Buffer 89 65 42> in return although when we are sending the same message back to the client using 'socket.send()' method we get the original text or message. This is because websocket message receiced on the server is in the binary format and logging it directly shows its raw form however, while sending it back tot he client, the webSocket library correctly interprets and sends it as the original message.
            => To convert the message from binary format to original form we use "Buffer" class provided by JS.
        */
        const b = Buffer.from(message)
        console.log(b.toString())
        socket.send(`${message}`)
    })
})

/***************************
 NOTE: Here, the is one way like a phone call, if we open two instances of frontend and write some message 
 in one instance, we will not be able to see that message in other instance.
*/
