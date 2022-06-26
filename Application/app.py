from flask import Flask, jsonify, abort
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from query import getAllSuppliers, getAllIngredients, getAllCustomers, getAllProducts, getAllCategories, getAllOrders, getAllRecipes
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
        try:
            addSupplier = engine.execute("\
                INSERT INTO supplier (supplier_name, supplier_category, street_name, zip_code, city)\
                    VALUES (%s, %s, %s, %s, %s)", (args["supplierName"], args["supplierCategory"],
                                                   args["supplierStreet"], args["supplierZipcode"],
                                                   args["supplierCity"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = supplier_delete_args.parse_args()
        try:
            deleteSupplier = engine.execute("\
                DELETE FROM supplier WHERE supplier_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

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

ingredient_delete_args = reqparse.RequestParser()
ingredient_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)


class Ingredient(Resource):
    def get(self):
        ingredients = getAllIngredients(engine)
        return jsonify(ingredients)

    def post(self):
        args = ingredient_post_args.parse_args()
        try:
            addIngredient = engine.execute(f"\
                INSERT INTO ingredient (ingredient_name, quantity, price, supplier_id)\
                    VALUES (%s, %s, %s, %s)", (args["ingredientName"], args["ingredientQuantity"],
                                               args["ingredientPrice"], args["supplierId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = ingredient_delete_args.parse_args()
        try:
            deleteIngredient = engine.execute("\
                DELETE FROM ingredient WHERE ingredient_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Ingredient, "/ingredient")


# Customer
customer_post_args = reqparse.RequestParser()
customer_post_args.add_argument(
    "customerFName", type=str, help="First Name is required", required=True)
customer_post_args.add_argument(
    "customerLName", type=str, help="Last Name is required", required=True)
customer_post_args.add_argument(
    "customerStreet", type=str, help="Street is required", required=True)
customer_post_args.add_argument(
    "customerZipcode", type=int, help="Zip code is required", required=True)
customer_post_args.add_argument(
    "customerCity", type=str, help="City is required", required=True)

customer_delete_args = reqparse.RequestParser()
customer_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)


class Customer(Resource):
    def get(self):
        customers = getAllCustomers(engine)
        return jsonify(customers)

    def post(self):
        args = customer_post_args.parse_args()
        try:
            addCustomer = engine.execute("\
                INSERT INTO customer (f_name, l_name, street_name, zip_code, city)\
                    VALUES (%s, %s, %s, %s, %s)", (args["customerFName"], args["customerLName"],
                                                   args["customerStreet"], args["customerZipcode"],
                                                   args["customerCity"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = customer_delete_args.parse_args()
        try:
            deleteCustomer = engine.execute("\
                DELETE FROM customer WHERE customer_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Customer, "/customer")

# Products
product_post_args = reqparse.RequestParser()
product_post_args.add_argument(
    "productName", type=str, help="Product Name is required", required=True)
product_post_args.add_argument(
    "sellingPrice", type=str, help="Selling Price is required", required=True)
product_post_args.add_argument(
    "categoryId", type=str, help="categoryId is required", required=True)

product_delete_args = reqparse.RequestParser()
product_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)


class Product(Resource):
    def get(self):
        products = getAllProducts(engine)
        return jsonify(products)

    def post(self):
        args = product_post_args.parse_args()
        try:
            addProduct = engine.execute("\
                INSERT INTO product (product_name, selling_price, category_id)\
                    VALUES (%s, %s, %s)", (args["productName"], args["sellingPrice"],
                                           args["categoryId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = product_delete_args.parse_args()
        try:
            deleteProduct = engine.execute("\
                DELETE FROM product WHERE product_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Product, "/product")

# Categories
category_post_args = reqparse.RequestParser()
category_post_args.add_argument(
    "categoryName", type=str, help="Category Name is required", required=True)
category_post_args.add_argument(
    "categoryDescription", type=str, help="Description is required", required=True)

category_delete_args = reqparse.RequestParser()
category_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)


class Category(Resource):
    def get(self):
        categories = getAllCategories(engine)
        return jsonify(categories)

    def post(self):
        args = category_post_args.parse_args()
        try:
            addCategory = engine.execute("\
                INSERT INTO category (category_name, category_description)\
                    VALUES (%s, %s)", (args["categoryName"], args["categoryDescription"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = category_delete_args.parse_args()
        try:
            deleteCategory = engine.execute("\
                DELETE FROM category WHERE category_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Category, "/category")

# Orders
order_post_args = reqparse.RequestParser()
order_post_args.add_argument(
    "customerId", type=str, help="Customer ID is required", required=True)
order_post_args.add_argument(
    "orderDate", type=str, help="Order Date is required", required=True)

order_delete_args = reqparse.RequestParser()
order_delete_args.add_argument(
    "rowId", type=int, help="Row ID is required", required=True)


class Orders(Resource):
    def get(self):
        orders = getAllOrders(engine)
        return jsonify(orders)

    def post(self):
        args = order_post_args.parse_args()
        try:
            addOrder = engine.execute("\
                INSERT INTO orders (customer_id, orders_date)\
                    VALUES (%s, %s)", (args["customerId"], args["orderDate"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = order_delete_args.parse_args()
        try:
            deleteOrder = engine.execute("\
                DELETE FROM orders WHERE orders_id = %s;", (args["rowId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Orders, "/orders")

# Recipe
recipe_post_args = reqparse.RequestParser()
recipe_post_args.add_argument(
    "productId", type=str, help="Product ID is required", required=True)
recipe_post_args.add_argument(
    "ingredientId", type=str, help="Ingredient ID is required", required=True)
recipe_post_args.add_argument(
    "quantity", type=str, help="Quantity is required", required=True)


recipe_delete_args = reqparse.RequestParser()
recipe_delete_args.add_argument(
    "productId", type=int, help="Product ID is required", required=True)
recipe_delete_args.add_argument(
    "ingredientId", type=int, help="Ingredient ID is required", required=True)


class Recipe(Resource):
    def get(self):
        recipes = getAllRecipes(engine)
        return jsonify(recipes)

    def post(self):
        args = recipe_post_args.parse_args()
        try:
            addRecipe = engine.execute("\
                INSERT INTO recipe (product_id, ingredient_id, quantity)\
                    VALUES (%s, %s, %s)", (args["productId"], args["ingredientId"],
                                           args["quantity"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200

    def delete(self):
        args = recipe_delete_args.parse_args()
        try:
            deleteRecipe = engine.execute("\
                DELETE FROM recipe WHERE product_id = %s AND ingredient_id = %s;", (args["productId"], args["ingredientId"]))
        except SQLAlchemyError as e:
            return {"error": str(e)}, 400

        return 200


api.add_resource(Recipe, "/recipe")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
