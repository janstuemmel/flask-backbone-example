#!/usr/bin/env python2

from flask import Flask, Blueprint
from flask_restful import Resource, Api

# website blueprint

website = Blueprint('website', __name__, static_folder='build')

@website.route('/', defaults={'path': 'index.html'})
@website.route('/<path:path>')
def front(path):
    try:
        f = website.send_static_file(path)
    except Exception as e:
        # let the javascript frontend
        # control their routes via pushState
        f = website.send_static_file('index.html')
    return f

# api blueprint

api = Blueprint('api', __name__)
rest = Api(api)

class TestData(Resource):
    def get(self):
        return [
            {'name': 'Hannah', 'age': 25},
            {'name': 'Peter', 'age': 26},
            {'name': 'Sebastian', 'age': 25},
            {'name': 'Kevin', 'age': 25},
        ]

rest.add_resource(TestData, '/')

# Flask

app = Flask(__name__, static_url_path=None, static_folder=None)
app.debug = True
# add blueprint
app.register_blueprint(website)
app.register_blueprint(api, url_prefix='/api/v1/test')

if __name__ == '__main__':
    app.run('0.0.0.0', 1337)
