// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

/* GET - Registracion. */
router.get('/registrar', mainController.registrar);

/* GET - Carga Producto. */
router.get('/cargaProducto', mainController.cargaProducto);

/* GET - Carrito. */
router.get('/carrito', mainController.carrito);

/* GET - Detalle producto. */
router.get('/detalleProducto', mainController.detalleProducto);


module.exports = router;