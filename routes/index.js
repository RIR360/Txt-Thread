require("dotenv").config();
const express = require('express');
const app = express.Router();

let index = 0;
const data = [
  {
    name: "Touhid Jomaddar",
    phone: "09340934",
    image: "https://i.gifer.com/237.gif"
  },
  {
    name: "Rizvy Islam",
    phone: "04309342",
    image: "https://media4.giphy.com/media/NG6nBdv9Ba0ONYLBsx/giphy.gif"
  },
  {
    name: "Rahin Zaman",
    phone: "04309342",
    image: "https://media1.giphy.com/media/Lm5xjVY7wxE9lgAbzN/giphy.gif"
  },
  {
    name: "Arafat Siam DJ",
    phone: "023249342",
    image: "https://media.tenor.com/DYzUq3uX1QgAAAAC/tom-and-jerry-evil.gif"
  },
  {
    name: "Imran Hosen Noyon",
    phone: "023249342",
    image: "https://memeadda.com/uploads/memes/funny-cat-tom-1621926684.gif"
  }
]

app.get("/home", (req, res, next) => {

  res.render("pages/home");

})

app.get("/chat/lists", (req, res, next) => {

  res.render("pages/chat-list", { data });

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

// manual error point
app.get("/error", (req, res, next) => {

  res.render("pages/error");

})

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

      return res.render("pages/error", {
        code: err.code,
        status: "error",
        message: err.toString()
      });

    } else {

      // internal esrver error
      console.error(err);

      return res.render("pages/error", {
        status: "error",
        message: err.toString()
      });

    }

  }

});

module.exports = app;