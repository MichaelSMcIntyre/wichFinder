const { Pool } = require('pg');
const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wichFinderShops',
  password: 'root',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to postgres!');
  }
});
connection.connect();

module.exports = {

  all: async function (response) {
    try {
      const res = await connection.query('SELECT * FROM public.shops');
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },

  nearbyShops: async function (lat, lng, radius, response) {
    try {
      const res = await connection.query('SELECT * FROM "reviewList"."allReviews" LIMIT 5');
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },

  add: async function (type, inputLat, inputLng, inputName,
                  inputPrice, inputSandwiches, inputAddress,
                  inputPhone, inputPhoto, inputWebsite, inputReview, inputFeatures, response) {
    try {
      var sandwiches = '';
      for(let i = 0; i < inputSandwiches.length; i++) {
        if (inputSandwiches[i] === '"'){
            sandwiches = sandwiches + `'`;
        } else{
            sandwiches = sandwiches + inputSandwiches[i];
        }
      }
      var features = '';
      for(let i = 0; i < inputFeatures.length; i++) {
        if (inputFeatures[i] === '"'){
          features = features + `'`;
        } else{
          features = features + inputFeatures[i];
        }
      }
      console.log('add location subbmited')
      const res = await connection.query(
        `INSERT INTO public.shops(
          lat,
          lng,
          name,
          price,
          sandwiches,
          features,
          address,
          phone,
          website,
          photo,
          review,
          type)
        VALUES (
          ${inputLat},
          ${inputLng},
          '${inputName}',
          '${inputPrice}',
          ARRAY ${sandwiches} ,
          ARRAY ${features},
          '${inputAddress}',
          '${inputPhone}',
          '${inputWebsite}',
          '${inputPhoto}',
          '${inputReview}',
          '${type}')`);
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      //response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },

  deleteShop: async function (id, response) {
    try {
      const res = await connection.query(`DELETE FROM public.shops WHERE id = ${id}`);
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },

  getPlacesNearby: async function (lat, lng, miles, response) {
    try {
      const res = await connection.query(`

      SELECT *, earth_distance(
        ll_to_earth(${lat}, ${lng}),
        ll_to_earth(lat, lng)
      ) / 1609.334 as distance
      FROM public.shops
      WHERE earth_distance(
        ll_to_earth(${lat}, ${lng}),
        ll_to_earth(lat, lng)
      ) / 1609.334 < ${miles}
      order by distance;

      `);
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      //response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },

};