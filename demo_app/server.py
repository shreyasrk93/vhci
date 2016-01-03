# This is because we have haven't pip installed ttcc and it's in the parent directory
import sys
sys.path.insert(0, '../')
######

from flask import Flask, request, jsonify, redirect, url_for, render_template
from ttcc import core
import devices

app = Flask(__name__)

def setup():
    core.register('refrigerator', devices.refrigerator)
    core.register('television', devices.television)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/command', methods=['POST'])
def command():
    command = request.form['command']
    try:
        result = core.parse(command)
        return result
    except:
        error = {
            'error': True,
            'message': 'Parse failure'
        }
        return jsonify(error)

if __name__ == '__main__':
    setup()
    app.run(debug=True)
