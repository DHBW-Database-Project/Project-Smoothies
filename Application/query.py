def getAllSupplier(engine):
    supplier = engine.execute("SELECT * FROM supplier")
    result = []
    
    for row in supplier:
        newRow = {"id": row[0], "name": row[1], "category": row[2],
                  "street": row[3], "zipcode": row[4], "city": row[5]}
        result.append(newRow)

    return result
