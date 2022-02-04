import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import axios from 'axios';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import AddShopForm from './components/AddShopForm/AddShopForm.jsx';


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
  const [inputFeatures, setInputFeatures] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPhoto, setInputPhoto] = useState('');
  const [inputWebsite, setInputWebsite] = useState('');
  const [inputReview, setInputReview] = useState('');

  const getAll = () => {
    return axios({
      method: 'GET',
      url: `/all`
    })
  }

  const getPlacesNearby = (lat, lng, mi) => {
    return axios({
      method: 'GET',
      url: `/getPlacesNearby`,
      params: {
        lat,
        lng,
        miles
      }
    })
  }

  const deleteShop = (id) => {
    return axios({
      method: 'DELETE',
      url: `/deleteShop`,
      data: {
        id: id
      }
    })
  }

  const add = (type, inputLat, inputLng, inputName,
               inputPrice, inputSandwiches, inputAddress,
               inputPhone, inputPhoto, inputWebsite, inputReview,
               inputFeatures
    ) => {
    return axios({
      method: 'POST',
      url: `/add`,
      data: {
        type, inputLat, inputLng, inputName,
        inputPrice, inputSandwiches, inputAddress,
        inputPhone, inputPhoto, inputWebsite, inputReview,
        inputFeatures
      }
    })
  }

  var deleteLocation = (id) => {
    return deleteShop(id);
  }

  var addLocation = () => {
    var sandArr = inputSandwiches.split(',');
    var featArr = inputFeatures.split(',');

   return add(
      type, Number(inputLat), Number(inputLng), inputName,
      inputPrice, JSON.stringify(sandArr), inputAddress,
      inputPhone, inputPhoto, inputWebsite, inputReview,
      JSON.stringify(featArr)
    )
  }

  var updateNearbyPlaces = () => {
    console.log('params in front::', coordinates, miles);
    return getPlacesNearby(coordinates.lat, coordinates.lng, miles)
        .then((data) => {
          console.log("data from axios:::", data.data)
          setPlaces(data.data);
        })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    console.log('useEf')
    updateNearbyPlaces();
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
            deleteLocation={deleteLocation}
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
            inputFeatures={inputFeatures}
            setInputFeatures={setInputFeatures}
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