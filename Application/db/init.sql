DROP VIEW IF EXISTS product_overview;
DROP VIEW IF EXISTS enough_ingredients;
DROP MATERIALIZED VIEW IF EXISTS sum_customer_orders;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS ingredient CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE supplier (
    supplier_id serial UNIQUE NOT NULL,
    supplier_name VARCHAR(30) NOT NULL,
    supplier_category VARCHAR(30) NOT NULL,
    street_name VARCHAR(30) NOT NULL,
    zip_code INT NOT NULL,
    city VARCHAR(25) NOT NULL,	
    PRIMARY KEY (supplier_id) 
);

CREATE TABLE ingredient (
    ingredient_id serial UNIQUE NOT NULL,
    ingredient_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    supplier_id INT,
    PRIMARY KEY(ingredient_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE
);

CREATE TABLE category (
    category_id serial UNIQUE NOT NULL,
    category_name VARCHAR(30) NOT NULL,
    category_description VARCHAR(100) NOT NULL,
    PRIMARY KEY(category_id)
);

CREATE TABLE product (
    product_id serial UNIQUE NOT NULL,
    product_name VARCHAR(20) NOT NULL,
    selling_price INT NOT NULL,
    category_id INT,
    PRIMARY KEY(product_id),
    FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

CREATE TABLE recipe (
    product_id INT,
    ingredient_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY(product_id, ingredient_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE customer (
    customer_id serial UNIQUE NOT NULL,
    f_name VARCHAR(20) NOT NULL,
    l_name VARCHAR(20) NOT NULL,
    street_name VARCHAR(20) NOT NULL,
    zip_code INT NOT NULL,
    city VARCHAR(20) NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE orders ( 
    orders_id serial UNIQUE NOT NULL,
    customer_id INT,
    orders_date DATE NOT NULL,
    PRIMARY KEY (orders_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE order_details (
    orders_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (orders_id, product_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY(orders_id) REFERENCES orders(orders_id) ON DELETE CASCADE
);

-- secondary index for product_index
CREATE UNIQUE INDEX product_index ON product (product_name);

INSERT INTO supplier (supplier_name, supplier_category, street_name, zip_code, city)
    VALUES
    ('Franz GmbH', 'standard', 'Betastr. 15', 68167, 'Mannheim'),
    ('Edelmann GbmH', 'noble', 'Hauptstr. 20', 60308, 'Frankfurt am Main'),
    ('Extro AG', 'convenient', 'Gartenstr. 1', 69115, 'Heidelberg'),
    ('Tower AG', 'convenient', 'Klarstr. 1', 24568, 'Bielefeld');

INSERT INTO ingredient (ingredient_name, quantity, price, supplier_id)
    VALUES
    ('Apple', 100, 0.2, 1),
    ('Banana', 100, 0.3, 1),
    ('Kiwi', 100, 0.4, 1),
    ('Spinat', 80, 0.3, 2),
    ('Mint', 100, 0.12, 3),
    ('Grapes', 80, 0.3, 2),
    ('Orange', 100, 0.2, 2),
    ('Mango', 80, 0.5, 2),
    ('Lemon', 80, 0.3, 2),
    ('Carrot', 100, 0.30, 3);

INSERT INTO category (category_name, category_description)
    VALUES
    ('detox', 'detoxify the body, gain energy'),
    ('healthy', 'felt relaxed and fit'),
    ('superfood', 'large amount of several specific nutrients');

INSERT INTO product (product_name, selling_price, category_id)
    VALUES
    ('Botox Smoothie', 5.0, 1),
    ('Mango Smoothie', 3.0, 2),
    ('Kiwi Smoothie', 5.0, 2),
    ('Golden Root', 4.0, 3);

INSERT INTO recipe (product_id, ingredient_id, quantity)
    VALUES
    (1, 1, 2),
    (1, 2, 1),
    (1, 10, 2),
    (1, 5, 1),
    (2, 8, 2),
    (2, 5, 1),
    (3, 3, 4),
    (3, 6, 1);

INSERT INTO customer (f_name, l_name, street_name, zip_code, city)
    VALUES
    ('Jan', 'Maier', 'Janstr. 24', 68167, 'Mannheim'),
    ('Jonas', 'Müller', 'Ulmenweg 50', 80333, 'München'),
    ('Sabie', 'Glück', 'Regensbogen 20', 80469, 'München');

INSERT INTO orders (customer_id, orders_date)
    VALUES
    (1, DATE '2022-01-30'),
    (2, DATE '2022-02-02'),
    (3, DATE '2022-02-16'),
    (1, DATE '2022-02-17'),
    (1, DATE '2022-02-18');

INSERT INTO order_details (orders_id, product_id, quantity)
    VALUES
    (1, 1, 4),
    (1, 2, 3),
    (2, 3, 10),
    (3, 4, 10),
    (4, 1, 1),
    (5, 1, 1),
    (5, 3, 1);


CREATE VIEW product_overview AS
SELECT
    a.product_id,
    a.product_name,
    d.category_name,
    b.quantity AS sale_quantity
FROM
    product AS a
    JOIN order_details AS b ON (a.product_id=b.product_id)
    JOIN orders AS c ON (b.orders_id=c.orders_id)
    JOIN category AS d ON (a.category_id=d.category_id);


CREATE MATERIALIZED VIEW sum_customer_orders AS
SELECT
    DISTINCT b.customer_id,
    b.f_name,
    b.l_name,
    sum(d.selling_price)
FROM
    orders a
    JOIN customer b ON a.customer_id = b.customer_id
    JOIN order_details c ON c.orders_id = a.orders_id
    JOIN product d ON c.product_id=d.product_id
GROUP BY b.customer_id;

/*
order_quantity the number of orders of a product (exp. 2x Botox and 3x Mango Smoothie)
ingredients_quanity the number of ingredients required to create the product
total_required_quantity is the sum of ingredients needed to fulfill the order
available_quantity is the number of ingredients available in the warehouse
*/
CREATE VIEW enough_ingredients AS
SELECT
    a.orders_id,
    a.product_id,
    a.quantity AS order_quantity,
    b.quantity AS ingredients_quantity,
    sum(a.quantity * b.quantity) AS total_required_quantity,
    c.quantity AS available_quantity
FROM
    order_details AS a
    JOIN recipe AS b ON (a.product_id=b.product_id)
    JOIN ingredient AS c ON (b.ingredient_id=c.ingredient_id)
GROUP BY 
    a.orders_id,
    a.product_id,
    a.quantity,
    b.quantity,
    c.quantity
ORDER BY
    a.orders_id;

/*
PROCEDURE:
This function is triggered when a new order is created. It checks if there are
enough ingredients in the stock. If not, it will return an error. If there are enough
ingredients, the order is created and the ingredients are removed from the stock.
*/
CREATE OR REPLACE PROCEDURE ingredient_quantity_product (orders_id NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    IF (
        SELECT SUM(total_required_quantity) FROM enough_ingredients
        WHERE orders_id = orders_id) > (SELECT SUM(quantity) FROM ingredient) 
        THEN
            RAISE EXCEPTION 'Not enough ingredients in the warehouse';
    ELSE
        UPDATE ingredient SET quantity = quantity - total_required_quantity
            WHERE ingredient_id IN (SELECT ingredient_id FROM enough_ingredients WHERE orders_id = orders_id);
        INSERT INTO order_details (orders_id, product_id, quantity)
            SELECT orders_id, product_id, quantity
            FROM enough_ingredients
            WHERE orders_id = orders_id;
    END IF;
END;
$$;

/*
CREATE TRIGGER enough_ingredients
    BERFORE INSERT ON order_details
    EXECUTE PROCEDURE ingredient_quantity_product(orders_id); 
*/