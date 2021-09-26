const mongoose = require("mongoose");

//Creating a author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    Name: String,
    books: [String],
});

//Create a author model
const AuthorModel = mongoose.model("authors",AuthorSchema);

modules.exports = AuthorModel;
