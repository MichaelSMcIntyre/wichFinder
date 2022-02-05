import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, FormControl, TextField, Button } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles';

import Authorization from '../../config.js';

import mapStyles from './mapStyles.js';

const Map = ({ setCoordinates, coordinates, places, setChildClicked, setUsername, setPassword, submitLogin, adminKeyPress, isAdmin }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Authorization}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl:true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
        }}
         onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, idx) => (
          <div
            className={classes.markerContainer}
            lat={place.lat}
            lng={place.lng}
            key={idx}
          >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo : 'https://www.saveur.com/uploads/2019/02/08/2TMDVDYTWLFWZEJWWE3FWRUGYA.jpg?auto=webp'}
                    alt={place.name}
                  />
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.price}
                  </Typography>
                </Paper>
              )
            }

          </div>
        ))}

      </GoogleMapReact>


      {adminKeyPress && !isAdmin ? (
        <form>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <input type="submit" value="Admin Login" onClick={(e) => submitLogin(e)}/>
        </form>

      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;