require("dotenv").config();
const express = require('express');
const app = express.Router();

app.get("/", (req, res, next) => {

  try {
    
    return res.render("layout.ejs");

  } catch (err) {

    next(err);
    
  }

});

app.get("/data", (req, res, next) => {

  try {

    const data = [
      {
        name: "Touhid",
        phone: "09340934"
      },
      {
        name: "Rizvy",
        phone: "04309342"
      },
      {
        name: "Rahin",
        phone: "04309342"
      }
    ]
    
    return res.render("common/users", { data });

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

    return res.json({
      code: 404,
      status: "error",
      message: "404 page not found"
    });

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