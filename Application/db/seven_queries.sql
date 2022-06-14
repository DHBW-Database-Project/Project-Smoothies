-- 1. All of customers are from München, who don't live in the city district with zip code "80333".
SELECT *
FROM customer
WHERE city = 'München'
AND zip_code != 80333


-- 2. This table sums up the total sales per customer
SELECT fname,lname, sum(price) AS total_sales
FROM customer a
JOIN orders b
ON a.customer_id = b.customer_id
JOIN order_details c
ON b.orders_id = c.orders_id
GROUP BY fname,lname


-- 3. All ingredients which were imported from the Supplier "Extro AG" with the ID = 3
SELECT a.ingredient_id, a.ingredient_name, b.supplier_id, b.supplier_name
FROM ingredient a
JOIN supplier b
ON a.supplier_id = b.supplier_id
WHERE b.supplier_id = '3'


-- 4. street_name , zip_code, city data of supplier were written as adress
SELECT supplier_id, supplier_name,
street_name ||', '|| zip_code ||' '|| city AS adress
FROM supplier

-- 5. How many times was the product ordered?
SELECT DISTINCT c.product_id, count(b.quantity) AS ordered_times
FROM order_details b
JOIN product c
ON b.product_id = c.product_id
GROUP BY c.product_id

-- 6. List of the products, which contain ingredient_id = 5
SELECT a.product_id, a.product_name
FROM product a
JOIN category b
ON a.product_id = b.product_id 
JOIN recipe c
ON a.product_id = c.product_id
JOIN ingredient d
ON c.ingredient_id = d.ingredient_id
WHERE d.ingredient_id = '5'


-- 7. Set Operation (Union): contains all the cities, from which the customer and suppliers come 
SELECT DISTINCT city
FROM customer
UNION 
SELECT DISTINCT city
FROM supplier
ORDER BY City

-- 8? 'SELECT DISTINCT product_id
FROM recipe
WHERE (product_id) IN ( SELECT product_id
FROM recipe
WHERE product_id='15001')
'