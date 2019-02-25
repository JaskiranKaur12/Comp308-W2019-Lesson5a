let express = require('express');
let router = express.Router();


//create reference to db schema
let contactModel=require('../models/contact');

module.exports.displayContactList = (req,res,next)=>{
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
}

module.exports.displayAddPage=(req,res,next)=>{
    res.render('contacts/add',{
        title:'Add New Favourite'
    });
    }

 module.exports.processAddPage=(req,res,next)=> {
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

}   

module.exports.displayEditPage=(req,res,next) => {
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
    }

    module.exports.processEditPage=(req,res,next)=>{
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
        }

        module.exports.performDelete=(req,res,next)=>{
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
        }