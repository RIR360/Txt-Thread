require("dotenv").config();
const express = require('express');
const app = express.Router();

let index = 0;
const data = [
  {
    name: "Touhid",
    phone: "09340934",
    image: "https://i.gifer.com/237.gif"
  },
  {
    name: "Rizvy",
    phone: "04309342",
    image: "https://media4.giphy.com/media/NG6nBdv9Ba0ONYLBsx/giphy.gif"
  },
  {
    name: "Rahin",
    phone: "04309342",
    image: "https://media1.giphy.com/media/Lm5xjVY7wxE9lgAbzN/giphy.gif"
  },
  {
    name: "Siam",
    phone: "023249342",
    image: "https://media.tenor.com/DYzUq3uX1QgAAAAC/tom-and-jerry-evil.gif"
  },
  {
    name: "Noyon",
    phone: "023249342",
    image: "https://memeadda.com/uploads/memes/funny-cat-tom-1621926684.gif"
  }
]

app.get("/home", (req, res, next) => {

  res.render("pages/home");

})

app.get("/chat/lists", (req, res, next) => {

  res.render("pages/chat-list");

})

app.get("/login", (req, res, next) => {

  res.render("pages/login");

})

app.get("/register", (req, res, next) => {

  res.render("pages/register");

})

app.get("/", (req, res, next) => {

  try {
    
    return res.render("layout.ejs");

  } catch (err) {

    next(err);
    
  }

});

app.get("/user", (req, res, next) => {

  try {

    const movement = req.query.move;
    const data_len = data.length;

    if (movement === 'right') {

      index++;

    } else {

      index--;

    }

    console.log()
    
    return res.render("common/card", { ...data[index % data_len] });

  } catch (err) {

    next(err);
    
  }

});


// must be at the bottom for not found page
app.use((req, res, next) => {

  const error = new Error();
  error.status = 404;
  next(error);

});

// custom error handeling middleware
app.use((err, req, res, next) => {

  if (err.status === 404) {

    res.render("pages/404");

  }

  else {

    if (err.name?.startsWith("Mongo")) {

      // database error
      console.error(err);

      return res.json({
        code: err.code,
        status: "error",
        message: err.toString()
      });

    } else {

      // internal esrver error
      console.error(err);

      return res.json({
        status: "error",
        message: err.toString()
      });

    }

  }

});

module.exports = app;