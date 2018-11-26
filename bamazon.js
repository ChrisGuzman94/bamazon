var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    inquirer
        .prompt({

            type: "list",
            message: "Are you a manager or a customer",
            choices: ["Manager", "Customer"],
            name: "who"


        })
        .then(function (answer) {
            if (answer.who === "Customer") {
                display();
            }

            if(answer.who === "Manager") {
                manager();
            }
          
        });

});

function display() {
    connection.query("SELECT item_id,product_name,price FROM products", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log("Id:" + res[i].item_id + "/" + " Name: " + res[i].product_name + "/" + " Price: " + res[i].price);

        }

        inquirer
            .prompt({
                name: "Item",
                type: "input",
                message: "Select item of your choosing by item_id"
            })
            .then(function (answer) {
                howMany(answer.Item)
            });




    });
}

function howMany(Id) {

    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "How many would you like?"
    })
        .then(function (answer) {
            connection.query("SELECT price, stock FROM products WHERE ?", { item_id: Id }, function (err, res) {
                var s = res[0].stock;
                var name = res[0].product_name;
                var answerInt = parseInt(answer.quantity, 10);
                var update = s - answerInt;
                var transaction = res[0].price * answerInt;
                console.log(transaction);

                if (answerInt === s) {
                    console.log("Insufficient quantity!");
                    connection.end();
                }

                else {

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock: update
                            },
                            {
                                item_id: Id
                            }
                        ],
                        function (err, res) {
                            console.log("You owe " + parseFloat(transaction) + " dollars");
                            connection.end();

                        }
                    );

                }









            })





        });
}

function manager() {

    inquirer
        .prompt({

            type: "list",
            message: "What would you like to do?",
            choices: ["View Products", "View low stock", "Add new product", "Add to stock"],
            name: "options"


        })
        .then(function (answer) {
            if (answer.options === "View Products") {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;

                    for (i = 0; i < res.length; i++) {
                        console.log("Id:" + res[i].item_id + " |" + " Name: " + res[i].product_name + "|" + " Department: " + res[i].dep_name + " |" + " Price: " +
                            res[i].price + " |" + " Stock: " + res[i].stock);

                    }
                    connection.end();

                });
            }

            if (answer.options === "View low stock") {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log("The following items are low in stock:");

                    for (i = 0; i < res.length; i++) {
                        if (res[i].stock <= 5) {
                            console.log("Product: " + res[i].product_name + " |||" + " Stock: " + res[i].stock);
                        }

                    }
                    connection.end();
                });

            }

            if (answer.options === "Add new product") {
                inquirer
                    .prompt([
                        // Here we create a basic text prompt.
                        {
                            type: "input",
                            message: "What is the name of the product?",
                            name: "item"
                        },
                        // Here we create a basic password-protected text prompt.
                        {
                            type: "input",
                            message: "How much does it cost?",
                            name: "price"
                        },
                        // Here we give the user a list to choose from.
                        {
                            type: "input",
                            message: "What department does it belong to?",
                            name: "dep"
                        },
                        // Here we ask the user to confirm.
                        {
                            type: "input",
                            message: "How many do you have?",
                            name: "how_many"
                        }
                    ])
                    .then(function (answer) {
                        connection.query(
                            "INSERT INTO products SET ?",
                            {
                                product_name: answer.item,
                                dep_name: answer.dep,
                                price: answer.price,
                                stock: answer.how_many
                            },
                            function (err, res) {
                                console.log("product added");
                                connection.query("SELECT * FROM products", function (err, res) {
                                    if (err) throw err;

                                    for (i = 0; i < res.length; i++) {
                                        console.log("Id:" + res[i].item_id + " |" + " Name: " + res[i].product_name + "|" + " Department: " + res[i].dep_name + " |" + " Price: " +
                                            res[i].price + " |" + " Stock: " + res[i].stock);

                                    }
                                    connection.end();
                                });



                            });
                    });
            }

            if (answer.options === "Add to stock") {

                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log("----------------------\n")
                    console.log("The following items are low in stock:\n");
                    console.log("----------------------\n")
                    var low = [];

                    for (i = 0; i < res.length; i++) {
                        if (res[i].stock <= 5) {
                            console.log("Product: " + res[i].product_name + " |||" + " Stock: " + res[i].stock);
                            low.push(res[i].product_name);

                        }
                    }
                    console.log("-----------------------------\n")

                    inquirer
                        .prompt({
                            name: "re_stock",
                            type: "list",
                            message: "What product would you like to re-stock",
                            choices: low,
                        })
                        .then(function (answer) {
                            add(answer.re_stock);

                        });

                });

            }



        });



}

function add(product) {
    inquirer
        .prompt({
            name: "Item",
            type: "input",
            message: "How much " + product + " would you like to re-stock"
        })
        .then(function (answer) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        product_name: product
                    },
                    {
                        stock: answer
                    }
                ],
                function (err, res) {
                    console.log(product + " has been re-stocked\n");
                    connection.end();

                }
            );

        });



}







