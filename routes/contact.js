let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');

//create reference to db schema
let contactModel=require('../models/contact');

/*GET Contact Lisr page=READ Operation */
router.get('/',(req,res,next)=>{
    contactModel.find((err,contactList)=>{
if(err){
    return console.error(err);
}
else {
    console.log(contactList);
    
    res.render('contacts/index',{
        title:'Favourite Things',
        contactList:contactList
    })

    }
    });
});
/**Get Route for the Add page */


router.get('/add',(req,res,next)=>{
res.render('contacts/add',{
    title:'Add New Favourite'
});
});
/**POST Route for processing the Add page */
router.post('/add',(req,res,next)=> {
    console.log(req.body)
let newContact=contactModel({
   
   "name":req.body.favouriteThing,
   "description":req.body.favouritevalue
}) 
contactModel.create(newContact,(err,contactModel)=>{
if(err){
    console.log(err);
    res.end(err);
    }
    else{
        //refresh the list
        res.redirect('/contact-list');
    }
})

})
module.exports = router;