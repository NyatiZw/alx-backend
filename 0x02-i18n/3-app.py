#!/usr/bin/env python3
"""
Basic Babel setup for a Flask app"""


from flask import Flask, render_template, request
from flask_babel import Babel, _
from typing import List


app: Flask = Flask(__name__)
babel: Babel = Babel(app)


class Config:
    """Configuration class for Flask app with Babel"""
    LANGUAGES: List[str] = ["en", "fr"]
    BABEL_DEFAULT_LOCALE: str = 'en'
    BABEL_DEFAULT_TIMEZONE: str = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """Dtermine the best match language"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """Render the index page with translated content"""
    return render_template(
        '3-index.html',
        title=_('home_title'),
        header=_('home_header')
    )


if __name__ == '__main__':
    app.run(debug=True)
