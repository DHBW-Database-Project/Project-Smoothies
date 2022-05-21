def getAllSupplier(engine):
    supplier = engine.execute("SELECT * FROM supplier")
    result = [list(row) for row in supplier]
    return result
