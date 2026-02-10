const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//const isValid = (username)=>{ //returns boolean
////write code to check is the username is valid
//}

// Check if a user with the given username already exists
const isValid = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if the user with the given username and password exists 
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here    const user = req.body.user;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error en logging" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User loggeado correctamente");
  } else {
    return res.status(208).json({ message: "Logueo invalido. Revise su usuario o contraseña" });
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // Extract email parameter and find users with matching email
  const isbn = req.params.isbn;
  let filtered_byIsbn = books[isbn];

  if (filtered_byIsbn.length > 0) {
    let filtered_books = filtered_byIsbn[0];
    let review = req.query.review;  

    if (review) {
        filtered_books.review = review;
    }

    books.push(filtered_books);
    
    res.send(`Gracias por tu reseña`);
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
