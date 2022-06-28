--1. List the amount of ordered products, which are categorized by category_id = 2
SELECT 
	p.product_id AS product_id,
	p.product_name AS product_name,
	p.category_id AS category,
	SUM(o.quantity) AS total_Sales
FROM 
	product AS p
	LEFT JOIN order_details AS o ON (p.product_id = o.product_id)
	LEFT JOIN category AS c ON (p.category_id = c.category_id)
WHERE 
	c.category_id = 2
GROUP BY 
	p.product_id

--2. Select all customers, who ordered Kiwi Smoothie and live in München
SELECT 	
	c.f_name || ' ' || c.l_name AS customer_name,
	c.street_name || ', ' || c.zip_code ||', ' || c.city AS address,
	o.orders_id AS orders_id,
	o.orders_date AS order_date,
	p.product_name AS product
FROM 
	customer AS c
	LEFT JOIN orders AS o ON (c.customer_id = o.customer_id)
	LEFT JOIN order_details AS d ON (o.orders_id = d.orders_id)
	LEFT JOIN product AS p ON (d.product_id = d.product_id)
WHERE 
	c.city = 'München' 
	AND p.product_name = 'Kiwi Smoothie';

--3. List the import history of every ingredient and total purchase price
SELECT 	
	i.ingredient_name AS ingredient,
	s.supplier_name as from_supplier,
	i.quantity AS quantity,
	i.price AS price_per_fruit,
	(i.quantity * i.price) AS invoice_amount
FROM 
	ingredient AS i
	LEFT JOIN supplier AS s ON (i.supplier_id = s.supplier_id)
    
--4. Show the accumulated revenue of every product and 
SELECT 	
	p.product_id AS product_id,
	p.product_name AS product,
	p.selling_price,
	SUM(d.quantity * p.selling_price) AS product_revenue
FROM 
	product AS p
	LEFT JOIN order_details AS d ON (p.product_id = d.product_id)
	LEFT JOIN orders AS o ON (d.orders_id = o.orders_id)
GROUP BY 
	p.product_id
ORDER BY 
	product_revenue ASC;

-- 5. List of the products, which contain ingredient_id = 5 or 6
SELECT 	
	b.product_id, 
	b.product_name AS Product,
	c.category_name AS category,
	d.ingredient_name AS ingredient
FROM 
	recipe a 
	JOIN product b ON a.product_id = b.product_id
	JOIN category c ON b.category_id = c.category_id 
	JOIN ingredient d ON a.ingredient_id = d.ingredient_id
WHERE 
	d.ingredient_id = '5' 
	OR d.ingredient_id = '6'

--6. Lists sum of products each order made in the last seven days of January
SELECT 
	d.orders_id,
 	COUNT(d.product_id) AS products
FROM 
	orders AS o
	JOIN order_details AS d ON (o.orders_id = d.orders_id)
WHERE 
	orders_date BETWEEN DATE '2022-01-25'
	AND DATE '2022-01-31'
GROUP BY
 	d.orders_id;

-- 7. List all the product and give zero by products, which weren't sold. Also quantity of sold product will be listed descending
SELECT 
	p.product_id,
	p.product_name,
	COALESCE(SUM(d.quantity), 0) AS quantity_sold_product
FROM 
	order_details AS d
	RIGHT JOIN product AS p ON (d.product_id = p.product_id)
GROUP BY 
	p.product_id
ORDER BY 
	quantity_sold_product DESC;