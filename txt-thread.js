require("dotenv").config();
const express = require('express');
const path = require("path");

const app = express();
const port = process.env.PORT || 3300;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

const index_router = require("./routes/index");

app.use("/", index_router);

app.listen(port, () => {

  console.log(`Server listening on port http://localhost:${port}`);
  
});