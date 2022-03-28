from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {"data": "Hello World"}

api.add_resource(HelloWorld, "/")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
