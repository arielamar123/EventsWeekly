const LOCAL_HOST = 'http://127.0.0.1:8001';
let socket = io.connect(LOCAL_HOST);


function send_text(form) {
    socket.emit('submit', form.header.value, form.footer.value);
}



