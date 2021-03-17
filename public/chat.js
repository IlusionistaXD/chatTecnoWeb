const socket = io();

//dom elementee
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function  () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
    console.log(username.value, message.value);
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (data) {
//limpia la accion
actions.innerHTML = '';

output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
<p>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p>
    <em>${data} is typing a message </em>
    </p>`
});



