const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//let library = [
//      {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
//      {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
//      {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
//      {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
//      {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
//      {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
//      {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
//      {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
//      {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
//      {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
//];

//let library = [books];

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
  res.send("si estamos en isbn");
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
  const filtered_books = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  if (filtered_books.length > 0) {
    return res.status(200).json(filtered_books);
  } else {
    return res.status(404).json({ message: "No se encontraron libros de este autor" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  res.send("si estamos en titulo");
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send("si estamos en review");
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;