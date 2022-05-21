from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from query import getAllSupplier
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app)
# set to false when on production
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:projectsmoothies@database:5432/postgres'
db = SQLAlchemy(app)
api = Api(app)

# postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<db_container_name>:<port>/<POSTGRES-DB>
engine = create_engine(
    'postgresql://postgres:projectsmoothies@database:5432/postgres')

Session = sessionmaker(bind=engine)
session = Session()

# init db
sql_statement = open("./db/init.sql", "r").read()
engine.execute(sql_statement)
print("all sql statements got executed")


# query directly
class HelloWorld(Resource):
    def get(self):
        supplier = engine.execute("SELECT * FROM supplier")
        result = [list(row) for row in supplier]
        return jsonify({"result": result})

api.add_resource(HelloWorld, "/")


# move query to another func
class Supplier(Resource):
    def get(self):
        supplier = getAllSupplier(engine)
        return jsonify({"result": supplier})

api.add_resource(Supplier, "/supplier")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
