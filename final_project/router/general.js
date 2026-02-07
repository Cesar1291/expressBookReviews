const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
public_users.get("/isbn/:isbn",(req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_byIsbn = books[isbn];
  
  if (filtered_byIsbn) {
    res.send(JSON.stringify(filtered_byIsbn,null,4));
  } else {
    const mssNoIsbn = [{ message: "Libro no encontrado" }]
    res.send(JSON.stringify(mssNoIsbn,null,4));
  }
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get("/author/:author",(req, res) => {
  //Write your code here
  const author = req.params.author;
  //Como books no es un array, si no un objeto de objetos, no se puede usar directamente el 
  //metodo .filter(). Como en la siguiente linea
  //let filtered_books = library.filter((book) => book.author === author);

  //Se hace un filtrado recuperando todos los objetos
  const filtered_byAuthor = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  if (filtered_byAuthor.length > 0) {
    //return res.status(200).json(filtered_books);
    res.send(JSON.stringify(filtered_byAuthor,null,4));
  } else {
    const mssNoAuthor = [{ message: "No se encontraron libros de este autor" }]
    res.send(JSON.stringify(mssNoAuthor,null,4));
  }
});

// Get all books based on title
public_users.get("/title/:title",(req, res) => {
  //Write your code here
  const title = req.params.title;

  //Se hace un filtrado recuperando todos los objetos
  const filtered_byTitle = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (filtered_byTitle.length > 0) {
    //return res.status(200).json(filtered_books);
    res.send(JSON.stringify(filtered_byTitle,null,4));
  } else {
    const mssNoTitle = [{ message: "No se encontraron libros de este titulo" }]
    res.send(JSON.stringify(mssNoTitle,null,4));
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get("/review/:isbn",(req, res) =>{
  //Write your code here
  const isbn = req.params.isbn;
  let revieByIsbn = books[isbn];

  if (revieByIsbn.length > 0) {
    //return res.status(200).json(filtered_books);
    res.send(JSON.stringify(revieByIsbn.reviews,null,4));
  } else {
    const mssNoReview = [{ message: "El libro aun no tiene reseñas" }]
    res.send(JSON.stringify(mssNoReview,null,4));
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;