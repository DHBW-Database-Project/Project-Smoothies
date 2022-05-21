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
    supplier_id VARCHAR(8) NOT NULL,
    supplier_name VARCHAR(30) NOT NULL,
    category VARCHAR(1) NOT NULL,
    street_name  VARCHAR(30) NOT NULL,
    zip_code INT NOT NULL,
    city  VARCHAR(25) NOT NULL,	
    PRIMARY KEY (supplier_id) 
);

CREATE TABLE ingredient (
    ingredient_id VARCHAR (5) NOT NULL,
    ingredient_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    supplier_id VARCHAR(8) NOT NULL,
    PRIMARY KEY(ingredient_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE product (
    product_id VARCHAR(5) NOT NULL,
    product_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    selling_price INT NOT NULL,
    PRIMARY KEY(product_id)
);

CREATE TABLE category (
    category_id VARCHAR(4)NOT NULL,
    category_name VARCHAR(30) NOT NULL,
    description VARCHAR(100) NOT NULL,
    product_id VARCHAR(5) NOT NULL,
    PRIMARY KEY(category_id, product_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE recipe (
    product_id VARCHAR(5) NOT NULL,
    ingredient_id VARCHAR(5) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY( product_id, ingredient_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE customer (
    customer_id VARCHAR(6) NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    streetname VARCHAR(20) NOT NULL,
    zip_code INT NOT NULL,
    city VARCHAR(20) NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE orders ( 
    orders_id VARCHAR(8) NOT NULL,
    customer_id VARCHAR(6) NOT NULL,
    order_date DATE NOT NULL,
    invoice_amount NUMERIC(10,2) NOT NULL,
    delivery_date DATE NOT NULL,
    PRIMARY KEY (orders_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_details (
    orders_id VARCHAR(8) NOT NULL,
    product_id VARCHAR(5) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY ( orders_id, product_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id),
    FOREIGN KEY(orders_id) REFERENCES orders(orders_id)
);


INSERT INTO supplier (supplier_id, supplier_name, category, street_name, zip_code, city)
    VALUES
    (12345678, 'Franz GmbH', 'x', 'Betastr. 15', 68167, 'Mannheim'),
    (12345679, 'Edelmann GbmH', 'y', 'Hauptstr. 20', 60308, 'Frankfurt am Main'),
    (12345677, 'Extro AG', 'z', 'Gartenstr. 1', 69115, 'Heidelberg');

INSERT INTO ingredient (ingredient_id, ingredient_name, quantity, price, supplier_id)
    VALUES
    (80001, 'Apple', 100, 0.2,  12345678),
    (80002, 'Banana',100, 0.3, 12345678),
    (80003, 'Kiwi', 100, 0.4,  12345678),
    (80004, 'Spinat',80, 0.3, 12345679),
    (80005, 'Mint', 100, 0.12,  12345677),
    (80006, 'Grapes',80, 0.3, 12345679),
    (80007, 'Orange', 100, 0.2,  12345679),
    (80008, 'Mango',80, 0.5, 12345679),
    (80009, 'Lemon',80, 0.3, 12345679),
    (80010, 'Carrot', 100, 0.30,  12345677);

INSERT INTO product (product_id, product_name, quantity, selling_price)
    VALUES
    (15001, 'Botox Smoothie',  120, 5.0),
    (15002, 'Mango Smoothie',  120, 3.0),
    (15003, 'Kiwi Smoothie',  120, 5.0),
    (15004, 'Golden Root',  120, 4.0);

INSERT INTO category (category_id, category_name, description, product_id)
    VALUES
    (1001, 'detox', 'detoxify the body, gain energy', 15001),
    (1002, 'healthy', 'felt relaxed and fit', 15004),
    (1003, 'superfood', 'large amount of several specific nutrients ', 15002),
    (1003, 'superfood', 'large amount of several specific nutrients ', 15003);

INSERT INTO recipe (product_id, ingredient_id, quantity)
    VALUES
    (15001, 80001,2),
    (15001, 80002,1),
    (15001, 80010,2),
    (15001, 80005,1),
    (15002, 80008,2),
    (15002, 80005,1),
    (15003, 80003,4),
    (15003, 80006,1);

INSERT INTO customer (customer_id, fname, lname, streetname, zip_code, city)
    VALUES
    (340001, 'Jan', 'Maier', 'Janstr. 24', 68167, 'Mannheim'),
    (340002, 'Jonas', 'Müller', 'Ulmenweg 50', 80333, 'München'),
    (340003, 'Sabie', 'Glück', 'Regensbogen 20', 80469, 'München');

INSERT INTO orders (orders_id, customer_id, order_date, invoice_amount, delivery_date)
    VALUES
    (40000001, 340001, DATE '2022-01-30', 29.0, DATE '2022.01.31'),
    (40000002, 340002, DATE '2022-02-02', 50.0, DATE '2022-02-02'),
    (40000003, 340003, DATE '2022-02-16', 40.0, DATE '2022-02-18'),
    (40000004, 340001, DATE '2022-02-17', 5.0, DATE '2022-02-18'),
    (40000005, 340002, DATE '2022-02-18', 10.0, DATE '2022-02-20');

INSERT INTO order_details (orders_id, product_id, price, quantity)
    VALUES
    (40000001, 15001, 20.0, 4),
    (40000001, 15002, 9.0, 3),
    (40000002, 15003, 50.0, 10),
    (40000003, 15004, 40.0, 10),
    (40000004,15001, 5.0, 1),
    (40000005,15001, 5.0, 1),
    (40000005,15003, 5.0, 1);


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