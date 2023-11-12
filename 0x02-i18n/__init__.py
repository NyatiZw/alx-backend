from flask import Flask
from flask_babel import Babel

app = Flask(__name__)

from app import routes

babel = Babel(app)
