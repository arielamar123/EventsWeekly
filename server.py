from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
from events_extractor import get_post

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('submit')
def handle_message(header, footer, start_date,end_date):
	print(header)
	print(footer)
	print(start_date)
	print(end_date)
	emit("return_post", get_post(header, footer,start_date,end_date))


if __name__ == '__main__':
	print("start")
	socketio.run(app, host='127.0.0.1', port=8888)
