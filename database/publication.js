const mongoose = require("mongoose");

//Creating a publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    Name: String,
    books: [String],
});

//Create a author model
const PublicationModel = mongoose.model("publications",PublicationSchema);

modules.exports = PublicationModel;
