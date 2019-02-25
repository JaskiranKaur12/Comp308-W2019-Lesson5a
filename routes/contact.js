let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');

//create reference to db schema
let contactModel=require('../models/contact');

/*GET Contact List page=READ Operation */
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
});

});
/** Get request-display the Edit page*/
router.get('/edit/:id',(req,res,next) => {
let id=req.params.id;
console.log(id);
contactModel.findById(id,(err,contactObject)=>
{
    if(err)
    {
        console.log(err);
        res.end(err);

    }
    else{
        //show the edit view
        res.render('contacts/edit',{
            title:"Edit Things",
            contact: contactObject
        });
        }

});
});
/** POST request-update the daaabse with data deom edit page*/
router.post('/edit/:id',(req,res,next)=>{
let id= req.params.id;
let updatedContact=contactModel({
"_id":id,
"name":req.body.favouriteThing,
"description":req.body.favouritevalue
});
contactModel.update({_id:id},updatedContact,(err)=>{
if(err)
{
    console.log(err);
    res.end(err);

}
else
{
    //refresh the contact list
    res.redirect('/contact-list');
}
})
});
/** GET request to perform the delete operation*/
router.get('/delete/:id',(req,res,next)=>{
    let id=req.params.id;
    contactModel.remove({_id:id},(err)=>{
        if(err)
        {   
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect("/contact-list");
        }
    });
})
module.exports = router;