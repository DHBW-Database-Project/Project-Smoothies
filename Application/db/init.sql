drop table category, customer, product, ingredient, order_details, orders, recipe, supplier





CREATE TABLE supplier
(
supplier_id VARCHAR(8) NOT NULL,
supplier_name VARCHAR(30) NOT NULL,
category VARCHAR(1) NOT NULL,
street_name  VARCHAR(30) NOT NULL,
zip_code INT NOT NULL,
city  VARCHAR(25) NOT NULL,	
PRIMARY KEY (supplier_id) 
);

CREATE TABLE ingredient
(
ingredient_id VARCHAR (5) NOT NULL,
ingredient_name VARCHAR(20) NOT NULL,
quantity INT NOT NULL,
price NUMERIC(10,2) NOT NULL,
supplier_id VARCHAR(8) NOT NULL,
PRIMARY KEY (ingredient_id),
FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);
CREATE TABLE product
(
product_id VARCHAR(5) NOT NULL,
product_name VARCHAR(20) NOT NULL,
quantity INT NOT NULL,
selling_price INT NOT NULL,
PRIMARY KEY(product_id)
);


CREATE TABLE category
(
category_id VARCHAR(4)NOT NULL,
category_name VARCHAR(30) NOT NULL,
description VARCHAR(100) NOT NULL,
product_id VARCHAR(5) NOT NULL,
PRIMARY KEY(category_id, product_id),
FOREIGN KEY(product_id) REFERENCES product(product_id)
);


CREATE TABLE recipe
(
product_id VARCHAR(5) NOT NULL,
ingredient_id VARCHAR(5) NOT NULL,
quantity INT NOT NULL,
PRIMARY KEY( product_id, ingredient_id),
FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id),
FOREIGN KEY(product_id) REFERENCES product(product_id)
);

CREATE TABLE customer
( 
customer_id VARCHAR(6) NOT NULL,
fname VARCHAR(20) NOT NULL,
lname VARCHAR(20) NOT NULL,
streetname VARCHAR(20) NOT NULL,
zip_code INT NOT NULL,
city VARCHAR(20) NOT NULL,
PRIMARY KEY   (customer_id)
);

CREATE TABLE orders
( 
orders_id VARCHAR(8) NOT NULL,
customer_id VARCHAR(6) NOT NULL,
order_date DATE NOT NULL,
invoice_amount NUMERIC(10,2) NOT NULL,
delivery_date DATE NOT NULL,
PRIMARY KEY   (orders_id),
FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_details
(
orders_id VARCHAR(8) NOT NULL,
product_id VARCHAR(5) NOT NULL,
price NUMERIC(10,2) NOT NULL,
quantity INT NOT NULL,
PRIMARY KEY ( orders_id, product_id),
FOREIGN KEY(product_id) REFERENCES product(product_id),
FOREIGN KEY(orders_id) REFERENCES orders(orders_id)
);






insert into supplier
values
(12345678, 'Franz GmbH', 'x', 'Betastr. 15', 68167, 'Mannheim'),
(12345679, 'Edelmann GbmH', 'y', 'Hauptstr. 20', 60308, 'Frankfurt am Main'),
(12345677, 'Extro AG', 'z', 'Gartenstr. 1', 69115, 'Heidelberg') ;

insert into ingredient
values
(80001, 'Apple', 100, 0.2,  12345678),
(80002, 'Banana',100, 0.3, 12345678),
(80003, 'Kiwi', 100, 0.4,  12345678),
(80004, 'Spinat',80, 0.3, 12345679),
(80005, 'Mint', 100, 0.12,  12345677),
(80006, 'Grapes',80, 0.3, 12345679),
(80007, 'Orange', 100, 0.2,  12345679),
(80008, 'Mango',80, 0.5, 12345679),
(80009, 'Lemon',80, 0.3, 12345679),
(80010, 'Carrot', 100, 0.30,  12345677)
;
insert into product
values
(15001, 'Botox Smoothie',  120, 5.0),
(15002, 'Mango Smoothie',  120, 3.0),
(15003, 'Kiwi Smoothie',  120, 5.0),
(15004, 'Golden Root',  120, 4.0);


insert into category
values
(1001, 'detox', 'detoxify the body, gain energy', 15001),
(1002, 'healthy', 'felt relaxed and fit', 15004),
(1003, 'superfood', 'large amount of several specific nutrients ', 15002),
(1003, 'superfood', 'large amount of several specific nutrients ', 15003)
;


insert into recipe
values
(15001, 80001,2),
(15001, 80002,1),
(15001, 80010,2),
(15001, 80005,1),
(15002, 80008,2),
(15002, 80005,1),
(15003, 80003,4),
(15003, 80006,1);


insert into customer
values
(340001, 'Jan', 'Maier', 'Janstr. 24', 68167, 'Mannheim'),
(340002, 'Jonas', 'Müller', 'Ulmenweg 50', 80333, 'München'),
(340003, 'Sabie', 'Glück', 'Regensbogen 20', 80469, 'München');

insert into orders
values
(40000001, 340001, '30.01.2022', 29.0, '31.01.2022'),
(40000002, 340002, '02.02.2022', 50.0, '02.02.2022'),
(40000003, 340003, '16.02.2022', 40.0, '18.02.2022'),
(40000004, 340001, '17.02.2022', 5.0, '18.02.2022'),
(40000005, 340002, '18.02.2022', 10.0, '20.02.2022')


;

insert into order_details
values
(40000001, 15001, 20.0, 4),
(40000001, 15002, 9.0, 3),
(40000002, 15003, 50.0, 10),
(40000003, 15004, 40.0, 10),
(40000004,15001, 5.0, 1),
(40000005,15001, 5.0, 1),
(40000005,15003, 5.0, 1)

;







CREATE VIEW product_overview AS
SELECT a.product_id, a.product_name, d.category_name , a.quantity as quantity_of_stock, b.quantity as sale_quantity


from product a

join order_details b
on a.product_id=b.product_id


join orders c
on b.orders_id=c.orders_id

join category d
on a.product_id=d.product_id
;






create materialized view sum_customer_oders

as

select  distinct b.customer_id, b.fname, b.lname, sum(a.invoice_amount) as total_amount
from orders a


join customer b
on a.customer_id= b.customer_id



group by b.customer_id
order by total_amount desc

;