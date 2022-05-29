from flask import Flask, jsonify, abort
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from query import getAllSuppliers, getAllIngredients
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

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


# test endpoint
class HelloWorld(Resource):
    def get(self):
        ingredient = engine.execute("SELECT * FROM ingredient")
        # result = [list(row) for row in ingredient]
        result = []
        for row in ingredient:
            newRow = {"id": row[0], "name": row[1], "quantity": row[2],
                      "price": row[3], "supplierId": row[4]}
            result.append(newRow)

        return jsonify(result)

api.add_resource(HelloWorld, "/")


# SUPPLIER
supplier_post_args = reqparse.RequestParser()
supplier_post_args.add_argument(
    "supplierName", type=str, help="Name is required", required=True)
supplier_post_args.add_argument(
    "supplierCategory", type=str, help="Category is required", required=True)
supplier_post_args.add_argument(
    "supplierStreet", type=str, help="Street is required", required=True)
supplier_post_args.add_argument(
    "supplierZipcode", type=int, help="Zipcode is required", required=True)
supplier_post_args.add_argument(
    "supplierCity", type=str, help="City is required", required=True)

supplier_delete_args = reqparse.RequestParser()
supplier_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)

class Supplier(Resource):
    def get(self):
        suppliers = getAllSuppliers(engine)
        return jsonify(suppliers)

    def post(self):
        args = supplier_post_args.parse_args()
        addSupplier = engine.execute("\
            INSERT INTO supplier (supplier_name, category, street_name, zip_code, city)\
                VALUES (%s, %s, %s, %s, %s)", (args["supplierName"], args["supplierCategory"],
                                               args["supplierStreet"], args["supplierZipcode"], args["supplierCity"]))
        return {"result": args}

    def delete(self):
        args = supplier_delete_args.parse_args()
        try:
            deleteSupplier = engine.execute("\
                DELETE FROM supplier WHERE supplier_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            errorMessage = str(e.__dict__["orig"])
            abort(400, errorMessage)
            
        return 200

api.add_resource(Supplier, "/supplier")

# INGREDIENT
ingredient_post_args = reqparse.RequestParser()
ingredient_post_args.add_argument(
    "ingredientName", type=str, help="Name is required", required=True)
ingredient_post_args.add_argument(
    "ingredientQuantity", type=str, help="Quantity is required", required=True)
ingredient_post_args.add_argument(
    "ingredientPrice", type=str, help="Price is required", required=True)
ingredient_post_args.add_argument(
    "supplierId", type=int, help="supplierId is required", required=True)


class Ingredient(Resource):
    def get(self):
        ingredients = getAllIngredients(engine)
        return jsonify(ingredients)

    def post(self):
        args = ingredient_post_args.parse_args()
        addIngredient = engine.execute(f"\
            INSERT INTO ingredient (ingredient_name, quantity, price, supplier_id)\
                VALUES (%s, %s, %s, %s)", (args["ingredientName"], args["ingredientQuantity"],
                                           args["ingredientPrice"], args["supplierId"]))
        return {"result": args}

api.add_resource(Ingredient, "/ingredient")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
