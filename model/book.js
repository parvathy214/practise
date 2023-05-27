const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    name:String,
    language:String,
    price:Number
})

const bookdata= mongoose.model('book',book)
module.exports=bookdata