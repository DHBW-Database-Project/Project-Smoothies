def getAllSuppliers(engine):
    suppliers = engine.execute("SELECT * FROM supplier")
    result = []

    for row in suppliers:
        newRow = {"id": row[0], "name": row[1], "category": row[2],
                  "street": row[3], "zipcode": row[4], "city": row[5]}
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
