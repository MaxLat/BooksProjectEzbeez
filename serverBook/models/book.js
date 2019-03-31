const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    titre : { type : String , unique:true},
    resume : String,
    categories : [String],
    note : Number,
    userId : String
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;