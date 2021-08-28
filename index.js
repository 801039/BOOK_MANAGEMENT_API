const { response } = require("express");
const express = require("express");

//Database
const database = require("./database");

//initialaization
const booky =  express();


/*
    route       /
    descripton  Get all books
    access      PUBLIC
    parameters  none
    methods     GET
*/
booky.get("/", (req,res) => {
    return res.json({books: database.books})
});


/*
    route       /is/
    descripton  Get specific books
    access      PUBLIC
    parameters  isbn
    methods     GET 
*/
booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );
    if(getSpecificBook.length===0){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
            //this will show "No book found for the ISBN of (your ISBN you typed)"
        });
    }
    return res.json({book: getSpecificBook });
});


/*
    route       /c/
    descripton  Get specific books based on category
    access      PUBLIC
    parameters  category
    methods     GET
*/
booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter((book) => 
    book.category.includes(req.params.category) 
    );
    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBook });
});


/*
    route       /l/
    descripton  Get list of books based on language
    access      PUBLIC
    parameters  language
    methods     GET
*/
booky.get("/l/:lan", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.lan
        );
    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the language of ${req.params.lan}`,
        });
    }
    return res.json({book: getSpecificBook });
});


/*
    route       /author/
    descripton  Get all authors
    access      PUBLIC
    parameters  none
    methods     GET
*/
booky.get("/author", (req,res) => {
    return res.json({ authors: database.author });
});


/*
    route       /author
    descripton  Get specific authors by name
    access      PUBLIC
    parameters  name
    methods     GET
*/
booky.get("/author/:name", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => 
    author.Name === req.params.name //In here this is because it is a string
        );
    if(getSpecificAuthor.length===0){
        return res.json({
            error: `No author found for the Name of ${req.params.id}`,
        });
    }
    return res.json({authors: getSpecificAuthor });
});


/*
    route       /author/book
    descripton  Get all authors based on books
    access      PUBLIC
    parameters  isbn
    methods     GET
*/
booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => 
    author.books.includes(req.params.isbn) 
    );
    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`,
        });
    }
    return res.json({authors: getSpecificAuthor });
});


/*
    route       /publicaton
    descripton  Get all publication
    access      PUBLIC
    parameters  none
    methods     GET
*/
booky.get("/publications", (req,res) => {
    return res.json({ publications: database.publication });
});

booky.listen(3000,()=>console.log("Hey SERVER is running 😎🚀")); 


/*
    route       /publication
    descripton  Get specific publication by name
    access      PUBLIC
    parameters  name
    methods     GET
*/
booky.get("/publication/:name", (req,res) => {
    const getSpecificPublication = database.publication.filter((publication) => 
    publication.Name === req.params.name //In here this is because it is a string
        );
    if(getSpecificPublication.length===0){
        return res.json({
            error: `No publication found for the Name of ${req.params.id}`,
        });
    }
    return res.json({publication: getSpecificPublication });
});


/*
    route       /publication/book
    descripton  Get all publications based on books
    access      PUBLIC
    parameters  isbn
    methods     GET
*/
booky.get("/publication/book/:isbn", (req,res) => {
    const getSpecificPublication = database.publication.filter((publication) => 
    publication.books.includes(req.params.isbn) 
    );
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for the book of ${req.params.isbn}`,
        });
    }
    return res.json({publication: getSpecificPublication });
});