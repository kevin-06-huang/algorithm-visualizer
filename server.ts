const express = require('express');
const path = require('path');

const app = express();

console.log(path.join(__dirname, 'src', 'assets'));
app.use('/assets', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res)=> res.status(200).sendFile(path.join(__dirname, 'src', 'index.html')));

app.listen(3000, () => {
  console.log(`Server listening on port 3000...`);
});

module.exports = app;
