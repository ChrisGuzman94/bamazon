DROP DATABASE IF EXISTS bamazon ;
create database bamazon;
use bamazon;

DROP TABLE IF EXISTS products ;
create table products(
item_id int(11) auto_increment not null,
product_name varchar(30),
dep_name varchar(30),
price decimal (10,2),
stock int(11),
primary key(item_id)
);

DROP TABLE IF EXISTS deparment_id ;
create table department_id(
dep_id int(11) auto_increment not null,
dep_name varchar(30),
overhead_cost decimal (10,2),
primary key(dep_id)



);

INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("chicken","meat", 8.50,10); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("beef","meat", 9.50,5); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("bacon","meat", 7.50,8); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("gatorade","water/hydration", 6.50,7); 

INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("water","water/hydration", 5.50,6); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("juice","water/hydration", 4.50,5); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("mouse","other", 3.50,4); 
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("hopes and dreams","other", 999.99,0);
INSERT INTO products (product_name,dep_name, price,stock)
VALUES ("moldy bread","other", 89.50,2);  
INSERT INTO department_id (dep_name,overhead_cost)
VALUES ("meat",8888); 
INSERT INTO department_id (dep_name,overhead_cost)
VALUES ("other",7777); 

select*from products;








