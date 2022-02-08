const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const dbCall = require('../database/index.js');

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json());


app.get('/all', (req, res) => {
  dbCall.all(res);
});

app.post('/add', (req, res) => {
  const { type, inputLat, inputLng, inputName,
    inputPrice, inputSandwiches, inputAddress,
    inputPhone, inputPhoto, inputWebsite, inputReview, inputFeatures } = req.body;

  dbCall.add(type, inputLat, inputLng, inputName,
    inputPrice, inputSandwiches, inputAddress,
    inputPhone, inputPhoto, inputWebsite, inputReview, inputFeatures, res);
});

app.delete('/deleteShop', (req, res) => {
  const { id } = req.body;
  dbCall.deleteShop(id, res);
});

app.get('/getPlacesNearby', (req, res) => {
  const { lat, lng, miles } = req.query;
  console.log('places in::', lat, lng, miles)
  dbCall.getPlacesNearby(lat, lng, miles, res);
});

app.post('/adminLoginSend', (req, res) => {
  const { username, password } = req.body;
  console.log('req.query::',req.body)
  dbCall.adminLoginSend(username, password, res);
});

app.get('/loaderio-466cf0ea6ce42516fdc6ce754218952f.txt', (req, res) => {
  res.sendFile('/home/ubuntu/loaderio-466cf0ea6ce42516fdc6ce754218952f.txt');
});

let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});