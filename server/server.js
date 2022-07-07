const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));


app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
 });