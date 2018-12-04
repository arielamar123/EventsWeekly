from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
from events_extractor import get_post

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('submit')
def handle_message(header, footer):
	print(header)
	print(footer)
	emit("return_post", get_post(header, footer))


if __name__ == '__main__':
	socketio.run(app, host='127.0.0.1', port=8888)
