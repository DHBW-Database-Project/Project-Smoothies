DROP VIEW IF EXISTS product_overview;
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
    category VARCHAR(30) NOT NULL,
    street_name  VARCHAR(30) NOT NULL,
    zip_code INT NOT NULL,
    city  VARCHAR(25) NOT NULL,	
    PRIMARY KEY (supplier_id) 
);

CREATE TABLE ingredient (
    ingredient_id serial UNIQUE NOT NULL,
    ingredient_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    supplier_id int,
    PRIMARY KEY(ingredient_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE product (
    product_id serial UNIQUE NOT NULL,
    product_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    selling_price INT NOT NULL,
    PRIMARY KEY(product_id)
);

CREATE TABLE category (
    category_id serial UNIQUE NOT NULL,
    category_name VARCHAR(30) NOT NULL,
    description VARCHAR(100) NOT NULL,
    product_id VARCHAR(5) NOT NULL,
    PRIMARY KEY(category_id, product_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE recipe (
    product_id serial UNIQUE NOT NULL,
    ingredient_id int,
    quantity INT NOT NULL,
    PRIMARY KEY( product_id, ingredient_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE customer (
    customer_id serial UNIQUE NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    streetname VARCHAR(20) NOT NULL,
    zip_code INT NOT NULL,
    city VARCHAR(20) NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE orders ( 
    orders_id serial UNIQUE NOT NULL,
    customer_id VARCHAR(6) NOT NULL,
    customer_name VARCHAR(20) NOT NULL,
    order_date DATE NOT NULL,
    ship_to VARCHAR(20) NOT NULL,
    invoice_amount NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (orders_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_details (
    orders_id serial UNIQUE NOT NULL,
    product_id VARCHAR(5) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY ( orders_id, product_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id),
    FOREIGN KEY(orders_id) REFERENCES orders(orders_id)
);


INSERT INTO supplier (supplier_name, category, street_name, zip_code, city)
    VALUES
    ('Franz GmbH', 'x', 'Betastr. 15', 68167, 'Mannheim'),
    ('Edelmann GbmH', 'y', 'Hauptstr. 20', 60308, 'Frankfurt am Main'),
    ('Extro AG', 'z', 'Gartenstr. 1', 69115, 'Heidelberg'),
    ('Tower AG', 'z', 'Klarstr. 1', 24568, 'Bielefeld');

INSERT INTO ingredient (ingredient_name, quantity, price, supplier_id)
    VALUES
    ('Apple', 100, 0.2,  1),
    ('Banana',100, 0.3, 1),
    ('Kiwi', 100, 0.4,  1),
    ('Spinat',80, 0.3, 2),
    ('Mint', 100, 0.12,  3),
    ('Grapes',80, 0.3, 2),
    ('Orange', 100, 0.2,  2),
    ('Mango',80, 0.5, 2),
    ('Lemon',80, 0.3, 2),
    ('Carrot', 100, 0.30,  3);

INSERT INTO product (product_name, quantity, selling_price)
    VALUES
    ('Botox Smoothie',  120, 5.0),
    ('Mango Smoothie',  120, 3.0),
    ('Kiwi Smoothie',  120, 5.0),
    ('Golden Root',  120, 4.0);

INSERT INTO category (category_id, category_name, description, product_id)
    VALUES
    (1001, 'detox', 'detoxify the body, gain energy', 1),
    (1002, 'healthy', 'felt relaxed and fit', 4),
    (1003, 'superfood', 'large amount of several specific nutrients ', 2),
    (1003, 'superfood', 'large amount of several specific nutrients ', 3);

INSERT INTO recipe (product_id, ingredient_id, quantity)
    VALUES
    (1, 1,2),
    (1, 2,1),
    (1, 10,2),
    (1, 5,1),
    (2, 8,2),
    (2, 5,1),
    (3, 3,4),
    (3, 6,1);

INSERT INTO customer ( fname, lname, streetname, zip_code, city)
    VALUES
    ('Jan', 'Maier', 'Janstr. 24', 68167, 'Mannheim'),
    ('Jonas', 'Müller', 'Ulmenweg 50', 80333, 'München'),
    ('Sabie', 'Glück', 'Regensbogen 20', 80469, 'München');

INSERT INTO orders (customer_id, customer_name, order_date, ship_to, invoice_amount)
    VALUES
    (1, 'Jan Maier', DATE '2022-01-30','Tupelo, MS', 29.0),
    (2, 'Jonas Müller', DATE '2022-02-02', 'München, DE' 50.0),
    (3, 'Sabie Glück', DATE '2022-02-16', 'Mannheim, DE', 40.0),
    (1, 'Jan Maier', DATE '2022-02-17', 'London, UK', 5.0),
    (2, 'Jan Maier', DATE '2022-02-18', 'Tokyo, Japan', 10.0);

INSERT INTO order_details (orders_id, product_id, quantity, price)
    VALUES
    (1, 1, 4, 20.0),
    (1, 2, 3, 9.0),
    (2, 3, 10, 50.0),
    (3, 4, 10, 40.0),
    (4, 1, 1, 5.0),
    (5, 1, 1, 5.0),
    (5, 3, 1, 5.0);


CREATE VIEW product_overview AS
SELECT
    a.product_id,
    a.product_name,
    d.category_name,
    a.quantity AS quantity_of_stock,
    b.quantity AS sale_quantity
FROM
    product a
    JOIN order_details b ON (a.product_id=b.product_id)
    JOIN orders c ON (b.orders_id=c.orders_id)
    JOIN category d ON (a.product_id=d.product_id);


CREATE MATERIALIZED VIEW sum_customer_orders AS
SELECT
    distinct b.customer_id,
    b.fname,
    b.lname,
    sum(a.invoice_amount) as total_amount
FROM
    orders a
    JOIN customer b ON a.customer_id= b.customer_id
GROUP BY b.customer_id
ORDER BY total_amount DESC;