const books = [
    {
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1,2],
    publication: [1],
    category: ["tech", "programming", "education", "thriller"],
    },
];

const author = [
    {
    id: 1,
    Name: "Pavan",
    books: ["12345Book","123456789Secret"],
    },
    {
    id: 2,
    Name: "Elon Musk",
    books: ["12345Book"]
    },
];

const publication = [
    {
    id: 1,
    Name: "writex",
    books: ["12345Book"],
    },
    {
    id: 2,
    Name: "writeo",
    books: ["123456789Secret"],
    },
];


module.exports = {books, author, publication };