from flask import render_template, Blueprint, request

from repo.calculator import Calculator


bp = Blueprint('calculator', __name__, url_prefix='/calculator')


@bp.route('/', methods=['GET'])
def calculator():
    return render_template('calculator.html')


@bp.route('/calculate/', methods=['POST'])
def calculate():
    return {'result': Calculator.calculate(request.json)}
