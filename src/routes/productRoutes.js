const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let { check, validationResult, body } = require('express-validator');

const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../public/images/avatars');
    },

    filename: (req, file, cb) => {
        let imageFinalName = `producto_avatar_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, imageFinalName);
    }
});

const upload = multer({ storage: storageDisk })

// ************ Controller Require ************
//const controller = require('../controllers/productController');



const productController = require('../controllers/productController');

/* GET - carga-producto  CREACION PRODUCTO 1*/
router.get('/productos/crear', productController.create);
/* POST - carga-producto CREACION PRODUCTO 2*/
router.post("/productos/crear", upload.single('image'), [
    check('name').isLength({ min: 2 }).withMessage('Este campo debe contener 2 caracteres minimo'),

], productController.store);
/* detalle-producto 3*/
router.get('/productos/detalleProducto/:id', productController.show);
//Listado de productos que ve el usuarioso 4
router.get('/todosLosProductos', productController.index);
/*GET Formulario de edicion 5 */
router.get('/productos/editar/:id', productController.edit);
/* PUT Accion de edicion 6  */
router.put('/productos/editar/:id', upload.single('image'), productController.update);
/*DELETE Accion de borrado  7*/
router.delete('/productos/borrar/:id', productController.destroy);
/* GET -carrito*/
//router.get('/carrito', productController.carrito);

module.exports = router;