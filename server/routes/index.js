let express = require('express');
let router = express.Router();

let indexController=require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/products', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactpage);

module.exports = router;
