import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import PlaceDetails from './components/PlaceDetails/PlaceDetails.jsx';

import FakeDB from './FakeDB.js';

//import { getPlacesData } from './servercall'

const App = () => {

  const [ places, setPlaces ] = useState([]);
  const [ childClicked, setChildClicked ] = useState(null);

  const [coordinates, setCoordinates] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [miles, setMiles] = useState(10);

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