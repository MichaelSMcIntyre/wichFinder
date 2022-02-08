import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';

import useStyles from './styles.js';

const List = ({ places, childClicked, isLoading, setMiles, miles, deleteLocation, shopType, setShopType, isAdmin }) => {
  const classes = useStyles();


  const [ elRefs, setElRefs ] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, idx) => elRefs[idx] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Sandwich Shops Around</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
      <>
      <FormControl className={classes.formControl}>
        <InputLabel>Miles Away</InputLabel>
        <Select variant="outlined"  value={miles} onChange={(e) => setMiles(e.target.value)}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select variant="outlined" value={shopType} onChange={(e) => setShopType(e.target.value)}>
          <MenuItem value={'All'}>Americana</MenuItem>
          <MenuItem value={'Americana'}>Americana</MenuItem>
          <MenuItem value={'Bodega'}>Bodega</MenuItem>
          <MenuItem value={'Deli'}>Deli</MenuItem>
          <MenuItem value={'Bar'}>Bar</MenuItem>
          <MenuItem value={'Pizza'}>Pizza</MenuItem>
          <MenuItem value={'Jewish Deli'}>Jewish Deli</MenuItem>
          <MenuItem value={'European'}>European Deli</MenuItem>
          <MenuItem value={'Food Truck'}>Food Truck</MenuItem>
          <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
          <MenuItem value={'Diner'}>Diner</MenuItem>
          <MenuItem value={'Burgers'}>Burgers</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} className={classes.list}>
        {places.map((place, idx) => (
          <Grid item key={idx} xs={12}>
             <PlaceDetails
               place={place}
               selected={Number(childClicked) === idx}
               refProp={elRefs[idx]}
               deleteLocation={deleteLocation}
               isAdmin={isAdmin}
              />
          </Grid>
        ))}
      </Grid>
      </>
      )}
    </div>
  );
}

export default List;