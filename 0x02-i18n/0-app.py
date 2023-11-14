#!/usr/bin/env python3
""" Basic Flask app """


from flask import Flask, render_template

app: Flask = Flask(__name__)


@app.route('/')
def index() -> str:
    """
    Render the index page.

    Returns:
        str: Rendered HTML content.
    """
    return render_template(
        'templates/0-index.html',
        title='Welcome to Holberton',
        header='Hello world'
    )


if __name__ == '__main__':
    app.run(debug=True)
