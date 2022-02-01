import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import axios from 'axios';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import PlaceDetails from './components/PlaceDetails/PlaceDetails.jsx';
import AddShopForm from './components/AddShopForm/AddShopForm.jsx';

import FakeDB from './FakeDB.js';

//import { getPlacesData } from './servercall'

const App = () => {

  const [ places, setPlaces ] = useState([]);
  const [ childClicked, setChildClicked ] = useState(null);

  const [coordinates, setCoordinates] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [miles, setMiles] = useState(10);

  const [type, setType] = useState('');
  const [inputLat, setInputLat] = useState('');
  const [inputLng, setInputLng] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputSandwiches, setInputSandwiches] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPhoto, setInputPhoto] = useState('');
  const [inputWebsite, setInputWebsite] = useState('');
  const [inputReview, setInputReview] = useState('');

  const add = (type, inputLat, inputLng, inputName,
               inputPrice, inputSandwiches, inputAddress,
               inputPhone, inputPhoto, inputWebsite, inputReview
    ) => {
    return axios({
      method: 'POST',
      url: `/products/`,
      data: {
        type, inputLat, inputLng, inputName,
        inputPrice, inputSandwiches, inputAddress,
        inputPhone, inputPhoto, inputWebsite, inputReview
      }
    })
  }

  var addLocation = () => {


  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  // useEffect(() => {
  //   getPlacesData(miles, coordinates);
        // .then((data) => {
        //   setPlaces(data);
        // })
  // }, [coordinates]);


  useEffect(() => {
    setIsLoading(true);
    setPlaces(FakeDB);
    setIsLoading(false);
  }, [coordinates]);


  return(
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
            miles={miles}
            setMiles={setMiles}
          />
          <AddShopForm
            type={type}
            setType={setType}
            inputLat={inputLat}
            setInputLat={setInputLat}
            inputLng={inputLng}
            setInputLng={setInputLng}
            inputName={inputName}
            setInputName={setInputName}
            inputPrice={inputPrice}
            setInputPrice={setInputPrice}
            inputSandwiches={inputSandwiches}
            setInputSandwiches={setInputSandwiches}
            inputAddress={inputAddress}
            setInputAddress={setInputAddress}
            inputPhone={inputPhone}
            setInputPhone={setInputPhone}
            inputPhoto={inputPhoto}
            setInputPhoto={setInputPhoto}
            inputWebsite={inputWebsite}
            setInputWebsite={setInputWebsite}
            inputReview={inputReview}
            setInputReview={setInputReview}
            addLocation={addLocation}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App;