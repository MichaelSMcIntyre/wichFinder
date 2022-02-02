const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

const dbCall = require('../database/index.js');

app.use(express.static(path.join(__dirname + '/../client/dist')));
// app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));

app.get('/all', (req, res) => {
  console.log('the call is happening')
  dbCall.all(res);
});

app.get('/nearbyShops', (req, res) => {
  const { lat, lng, radius } = req.query;
  dbCall.nearbyShops(lat, lng, radius, res);
});

app.post('/add', (req, res) => {
  const { type, inputLat, inputLng, inputName,
    inputPrice, inputSandwiches, inputAddress,
    inputPhone, inputPhoto, inputWebsite, inputReview, inputFeatures } = req.body;

  dbCall.add(type, inputLat, inputLng, inputName,
    inputPrice, inputSandwiches, inputAddress,
    inputPhone, inputPhoto, inputWebsite, inputReview, inputFeatures, res);
});

app.get('/loaderio-466cf0ea6ce42516fdc6ce754218952f.txt', (req, res) => {
  res.sendFile('/home/ubuntu/loaderio-466cf0ea6ce42516fdc6ce754218952f.txt');
});

let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});