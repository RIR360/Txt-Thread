const express = require('express');

const app = express();
const port = process.env.PORT || 3300;

app.get('/', (req, res) => {
  res.send('Hello, TXT Thread!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});