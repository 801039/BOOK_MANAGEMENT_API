require ("dotenv").config();

const { response } = require("express");
const express = require("express");

//Mongoose
const mongoose = require("mongoose");

//Database
const database = require("./database");

//initialaization
const booky =  express();

//Configuration
booky.use(express.json());

//Establish database connection
mongoose
.connect(process.env.MONGO_URL)
.then(()=> console.log("connection established !!!!😏"));


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




/*
    route       /book/add
    descripton  add new book
    access      PUBLIC
    parameters  none
    methods     POST
*/
booky.post("/book/add",(req,res) => {
    const { newBook } = req.body;
    console.log(req.body);
    database.books.push(newBook);
    return res.json({books: database.books});
});


/*
    route       /author/add
    descripton  add new author
    access      PUBLIC
    parameters  none
    methods     POST
*/
booky.post("/author/add",(req,res) => {
    const { newAuthor } = req.body;
    console.log(req.body);
    database.author.push(newAuthor);
    return res.json({authors: database.author});
});


/*
    route       /publication/add
    descripton  add new publication
    access      PUBLIC
    parameters  none
    methods     POST
*/
booky.post("/publication/add",(req,res) => {
    const { newPublication } = req.body;
    console.log(req.body);
    database.publication.push(newPublication);
    return res.json({publications: database.publication});
});



/*
    route       /book/update/title
    descripton  update book title
    access      PUBLIC
    parameters  isbn |Param-Body is used in here
    methods     PUT
*/
booky.put("/book/update/title/:isbn",(req,res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            console.log(req.body);
            return;
        }
    });
    return res.json({ books: database.books });
});


/*
    route       /book/update/author
    descripton  update / add a new author for a book
    access      PUBLIC
    parameters  isbn |Param-Parameter is used in here
    methods     PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res) => {
    
    //update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //update author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            return author.books.push(req.params.isbn);
        }
    });

    return res.json({ books: database.books, authors: database.author});
});


/*
    route       /book/update/author
    descripton  update author name
    access      PUBLIC
    parameters  name |Param-Body is used in here
    methods     PUT
*/
booky.put("/book/update/author/:name",(req,res) => {
    database.author.forEach((author) => {
        if (author.Name === req.params.name ){  
            author.Name = req.body.newAuthorName;
            console.log(req.body);
            return;
        }
    });
    return res.json({ author: database.author });
});


/*
    route       /book/update/publication
    descripton  update the publication name
    access      PUBLIC
    parameters  name |Param-Body is used in here
    methods     PUT
*/
booky.put("/book/update/publication/:name",(req,res) => {
    database.publication.forEach((publication) => {
        if (publication.Name === req.params.name ){  
            publication.Name = req.body.newPublicationName;
            console.log(req.body);
            return;
        }
    });
    return res.json({ publication: database.publication });
});


/*
    route       /publication/update/book
    descripton  add new book to publication
    access      PUBLIC
    parameters  isbn
    methods     PUT
*/
booky.put("/publication/update/book/:isbn",(req,res) => {
    //update the publication database
    database.publication.forEach((publication) => { 
        if (publication.id === req.body.pubId ){  
            return publication.books.push (req.params.isbn);
        }
    });

    //update the book database
    database.books.forEach((book) => { 
        if (book.ISBN === req.params.isbn ){  
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({ 
        books: database.books, 
        publications: database.publication,
        message: "Successfully updated publication", 
    }); 
    
});



/*
    route       /book/delete
    descripton  delete a book
    access      PUBLIC
    parameters  isbn
    methods     DELETE
*/
booky.delete("/book/delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;
    console.log(req.body);
    return res.json({books: database.books}); 
});


/*
    route       /book/delete/author
    descripton  delete a author from a book
    access      PUBLIC
    parameters  isbn, author id
    methods     DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (author) => author !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });

    //update the author database
    database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter(
                (book) => book !== req.params.isbn
            );

            author.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books, 
        author: database.author, 
        message: "author was deleted !!!! 😞",
    })
});


/*
    route       /author/delete
    descripton  delete an author
    access      PUBLIC
    parameters  name
    methods     DELETE
*/
booky.delete("/author/delete/:name", (req,res) => {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.Name !== req.params.name
    );

    database.author = updatedAuthorDatabase;
    console.log(req.body);
    return res.json({author: database.author}); 
});


/*
    route       /publication/delete
    descripton      
    access      PUBLIC
    parameters  id
    methods     DELETE
*/
booky.delete("/publication/delete/:id", (req,res) => {
    const updatedPublicationDatabase = database.publication.filter(
        (publication) => publication.id !== parseInt(req.params.id)
    );

    database.publication = updatedPublicationDatabase;
    console.log(req.body);
    return res.json({publication: database.publication}); 
});


/*
    route       /publication/delete/book
    descripton  delete a book from publication
    access      PUBLIC
    parameters  isbn, publication id
    methods     DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) => {
    //Update the publication database
    database.publication.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubId)){
            const newBookList = publication.books.filter(
                (book) => book !== req.params.isbn
            );
            publication.books = newBookList;
            return;
        }
    });

    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });

    return res.json({
        book: database.books, 
        publication: database.publication, 
        message: "publication was deleted !!!! 😞",
    })
});



booky.listen(3000,()=>console.log("Hey SERVER is running 😎🚀")); 