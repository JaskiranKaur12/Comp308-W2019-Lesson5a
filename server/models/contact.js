let mongoose=require('mongoose');


//create a model class
let contactSchema=mongoose.Schema({
name: String,
description: String
},
{
    collection: "Favouritethings"
});
module.exports=mongoose.model('JaskiranDb',contactSchema);