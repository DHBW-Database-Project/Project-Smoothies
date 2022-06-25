def getAllSuppliers(engine):
    suppliers = engine.execute("SELECT * FROM supplier")
    result = []

    for row in suppliers:
        newRow = {"id": row[0], "name": row[1],
                  "category": row[2], "street": row[3],
                  "zipcode": row[4], "city": row[5]}
        result.append(newRow)

    return result


def getAllCustomers(engine):
    customers = engine.execute("SELECT * FROM customer")
    result = []

    for row in customers:
        newRow = {"id": row[0], "f_name": row[1],
                  "l_name": row[2], "streetname": row[3],
                  "zip_code": row[4], "city": row[5]}
        result.append(newRow)

    return result


def getAllProducts(engine):
    products = engine.execute("SELECT * FROM product")
    result = []
    for row in products:
        newRow = {"id": row[0], "product_name": row[1],
                  "selling_price": row[2], "category_id": row[3]}
        result.append(newRow)
    return result


def getAllIngredients(engine):
    ingredients = engine.execute("SELECT * FROM ingredient")
    result = []

    for row in ingredients:
        newRow = {"id": row[0], "name": row[1], "quantity": row[2],
                  "price": row[3], "supplierId": row[4]}
        result.append(newRow)

    return result


def getAllCategories(engine):
    categories = engine.execute("SELECT * FROM category")
    result = []

    for row in categories:
        newRow = {"id": row[0], "name": row[1],
                  "description": row[2]}
        result.append(newRow)

    return result


def getAllOrders(engine):
    orders = engine.execute("SELECT * FROM orders")
    result = []

    for row in orders:
        newRow = {"id": row[0], "customerId": row[1],
                  "date": row[2]}
        result.append(newRow)

    return result


def getAllRecipes(engine):
    recipes = engine.execute("SELECT * FROM recipe")
    result = []

    for row in recipes:
        newRow = {"productId": row[0], "ingredientId": row[1],
                  "quantity": row[2]}
        result.append(newRow)

    return result
