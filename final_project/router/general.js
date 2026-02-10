const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let authenticatedUser = require("./auth_users.js").authenticatedUser;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "Usuario registrado correctamente. Ahora puedes hacer login" });
    } else {
      return res.status(404).json({ message: "El Usuario ya existe!" });
    }
  }
  return res.status(404).json({ message: "No se puede registrar el usuario." });
    //return res.status(300).json({message: "Yet to be implemented"});
}); 

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("No se pudieron recuperar los libros");
    }
  });

  getBooks
    .then((bookList) => {
      res.status(200).send(JSON.stringify(bookList, null, 4));
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
public_users.get("/isbn/:isbn",(req, res) => {
  const isbn = req.params.isbn;
  const findByIsbn = new Promise((resolve, reject) => {
    let book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject({ message: "Libro no encontrado" });
    }
  });  
  
  findByIsbn
    .then((bookDetails) => {
      res.status(200).send(JSON.stringify(bookDetails, null, 4));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error, null, 4));
    });
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get("/author/:author",(req, res) => {
  //Write your code here
  const author = req.params.author;
  const findByAuthor = new Promise((resolve, reject) => {
    // Realizamos el filtrado
    const filtered_byAuthor = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );

    if (filtered_byAuthor.length > 0) {
      resolve(filtered_byAuthor);
    } else {
      reject({ message: "No se encontraron libros de este autor" });
    }
  });  

  findByAuthor
    .then((booksFound) => {
      res.status(200).send(JSON.stringify(booksFound, null, 4));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error, null, 4));
    });
});

// Get all books based on title
public_users.get("/title/:title",(req, res) => {
  //Write your code here
  const title = req.params.title;
  const findByTitle = new Promise((resolve, reject) => {
    // Realizamos el filtrado
    const filtered_byTitle = Object.values(books).filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );

    if (filtered_byTitle.length > 0) {
      resolve(filtered_byTitle);
    } else {
      reject({ message: "No se encontraron libros de este autor" });
    }

  findByTitle
    .then((booksFound) => {
      res.status(200).send(JSON.stringify(booksFound, null, 4));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error, null, 4));
    });
  });  
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get("/review/:isbn",(req, res) =>{
  //Write your code here
  const isbn = req.params.isbn;
  let revieByIsbn = books[isbn];
  //res.send(JSON.stringify(revieByIsbn.reviews,null,4));
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