from flask import Flask, url_for, redirect

from views import calculator


app = Flask(__name__)
app.register_blueprint(calculator.bp)


@app.route('/', methods=['GET'])
def home():
    return redirect(url_for('calculator.calculator'))


if __name__ == '__main__':
    app.run(host='0.0.0.0')
