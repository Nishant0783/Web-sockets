const socket = new WebSocket('ws://localhost:3000')

function sendMessage(e) {
    e.preventDefault();
    const input = document.querySelector('input');
    if(input.value) {
        socket.send(input.value)
        input.value=""
    }
    input.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages
socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

/*
    This is the frontend setup for the chat app.
    => First we setup a socket on url 'ws://localhost:3000' using WebSocket interface. This is provided by browser built-in API in JS.
    => We trigger the 'sendMessage' method on submit event when detected on form.
    => sendMessage method send the message to the server.
*/ 