let express = require('express');
let router = express.Router();




let contactController=require('../controllers/contact');

/*GET Contact List page=READ Operation */
router.get('/',contactController.displayContactList);

/**Get Route for the Add page */
router.get('/add',contactController.displayAddPage);

/**POST Route for processing the Add page */
router.post('/add',contactController.processAddPage);

/** Get request-display the Edit page*/
router.get('/edit/:id',contactController.displayEditPage);

/** POST request-update the daaabse with data deom edit page*/
router.post('/edit/:id',contactController.processEditPage);

/** GET request to perform the delete operation*/
router.get('/delete/:id',contactController.performDelete);
module.exports = router;