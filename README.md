# bamazon

This is a Node.JS app that interacts with a MySQL server on the localhost. The seeds.sql and schema.sql files can be used to get your local MySQL server set up for testing.

bAmazon - This is a wrapper script that allows the user to choose between the different views: Customer, Manager, and Supervisor.

# node bamazon.js

bamazon Portal

-----------------------------------

A) Customer View

B) Manager View



? Please choose an option:
bamazonCustomer - The customer view allows the user to buy any amount of an item, as long as there is enough left in stock.

#node bamazonCustomer.js

| Item Id  | Product Name | Price |
| ------------- | ------------- | ------------- |
|  1 | Xbox  | 400  |
|  2 | PS4  | 300  |
|  3 | Call of Duty  | 59.99  |
|  4 | Baseball Glove  | 40  |
|  5 | Baseball Bat  | 50  |


? What is the ID of the product you would like to buy? 1
? How many units of this product would you like you buy? 2

Your total is 800, thank you for shopping at bAmazon =]
bamazonManager - The manager view allows the user to view all products for sale, with the additional stock_quantity info. The manager can also view the inventory of items with less than 100 units in stock. They can add more stock of any item, or add a brand new item.

#node bamazonManager.js

bamazon Manager Portal

-----------------------------------

A) View Products for Sale

B) View Low Inventory

C) Add to Inventory

D) Add New Product

? Please choose an option:  b

| Item Id  | Product Name | Price | stock_quantity |
| ------------- | ------------- | ------------- | ------------- |
|  1 | Xbox  | 400  | 34 |
|  2 | PS4  | 300  | 40 |




bamazonSupervisor - The supervisor view allows the user to view each department along with the product sales and total profit. They can also create a new department.


Technologies Used:

Javascript
NodeJS
MySQL


#*Navigate to screenshots folder to see fully working app*
