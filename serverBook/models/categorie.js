const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    label : { type : String , unique:true},
});

const CategorieModel = mongoose.model("categorie", categorieSchema);

module.exports = CategorieModel;