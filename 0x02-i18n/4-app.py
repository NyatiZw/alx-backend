#!/usr/bin/env python3
"""Basic Babel setup for a Flask app"""


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
    """Determine the best-matching language"""
    user_locale = request.args.get('locale')

    if user_locale and user_locale in app.config['LANGUAGES']:
        return user_locale
    else:
        return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """Render the index page with translated content"""
    return render_template(
        '4-index.htnl',
        title=_('home_title'),
        header=_('home_header')
    )


if __name__ == '__main__':
    app.run(debug=True)
