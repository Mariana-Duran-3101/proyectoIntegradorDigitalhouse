const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
//const Products = db.Products;


const controller = {
    // todos los productos

    index: (req, res) => {
        // Error al sumar los precios

        //suma todos los  precios
         let totalSum = db.Products
        .sum('price');

        //Busco los productos
        let products = db.Products
            .findAll({
                order: [
                    ['id', 'DESC']
                ],

                attributes: ['id', 'name', ]
            });

        Promise.all([totalSum, products])
        //Promise.all([products])

        .then(function([amount, product]) {

                let result = {
                    metadata: {
                        // status: 200,
                        // url: "/api/productos",
                        url: req.originalUrl,
                        quantity: products.length,
                        amount: amount
                    },
                    data: products
                }

                return res.send(result);

            })
            .catch(error => console.log(error));

    },
    apiUsers: (req, res) => {
        /* Busca todos los usuarios en la base de datos */
        db.Users
            .findAll(

                {
                    order: [
                        ['id', 'DESC']
                    ],
                    attributes: ['first_name', 'last_name', 'email']
                }
            )
            .then(users => {
                /* En el resultado tambien le ponemos la URL de donde sacamos los datos y cuantos hay */
                let result = {
                        metadata: {
                            url: req.originalUrl,
                            quantity: users.length
                        },
                        /* Aca le decimos que nos traiga los datos encontrados */
                        data: users
                    }
                    /* llamamos a result en el send, para que nos muestre los datos y lo q esta en metadata */
                return res.send(result);
            })
            .catch(error => console.log(error));
    },


}
module.exports = controller;