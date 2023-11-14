#!/usr/bin/env python3
"""Advanced Babel setup for Flask app"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _, get_locale
from typing import List


app: Flask = Flask(__name__)
babel: Babel = Babel(app)

# Mock user table
users = {
        1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
        2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
        3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
        4: {
            "name": "Teletubby",
            "locale": "None",
            "timezone": "Europe/London"
            },
}


class Config:
    """Configuration class for Flask app with BAbel"""
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


def get_user(user_id: int) -> dict:
    """Get user information based on user ID"""
    return users.get(user_id)


@app.before_request
def before_request():
    """Execute before all other functions"""
    user_id = request.args.get('login_as', type=int)
    g.user = get_uset(user_id)


@app.route('/')
def index() -> str:
    """Render the index page with translated content"""
    return render_template(
        '5-index.html',
        title=_('home_title'),
        header=_('home_header')
    )


if __name__ == '__main__':
    app.run(debug=True)
