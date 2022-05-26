from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
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

# query directly
class HelloWorld(Resource):
    def get(self):
        supplier = engine.execute("SELECT * FROM supplier")
        result = [list(row) for row in supplier]
        return jsonify({"result": result})

api.add_resource(HelloWorld, "/")


supplier_post_args = reqparse.RequestParser()
supplier_post_args.add_argument(
    "supplierName", type=str, help="Name is required", required=True)
supplier_post_args.add_argument(
    "supplierCategory", type=str, help="Category is required", required=True)
supplier_post_args.add_argument(
    "supplierStreet", type=str, help="street is required", required=True)
supplier_post_args.add_argument(
    "supplierZipcode", type=int, help="zipcode is required", required=True)
supplier_post_args.add_argument(
    "supplierCity", type=str, help="city is required", required=True)


class Supplier(Resource):
    def get(self):
        supplier = getAllSupplier(engine)
        return jsonify(supplier)

    def post(self):
        args = supplier_post_args.parse_args()
        # addSupplier = engine.execute(f"\
        #     INSERT INTO supplier (supplier_name, category, street_name, zip_code, city)\
        #         VALUES ({args['supplierName']}, {args['supplierCategory']}, {args['supplierStreet']}, \
        #             {args['supplierZipcode']}, {args['supplierCity']})")
        addSupplier = engine.execute(f"\
            INSERT INTO supplier (supplier_name, category, street_name, zip_code, city)\
                VALUES (%s, %s, %s, %s, %s)", (args["supplierName"], args["supplierCategory"],
                                               args["supplierStreet"], args["supplierZipcode"], args["supplierCity"]))
        return {"result": args}


api.add_resource(Supplier, "/supplier")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
