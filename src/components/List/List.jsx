import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';

import useStyles from './styles.js';

const List = ({ places, childClicked, isLoading, setMiles, miles, deleteLocation }) => {
  const classes = useStyles();


  const [ elRefs, setElRefs ] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, idx) => elRefs[idx] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Sandwich slingers around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
      <>
      <FormControl className={classes.formControl}>
        <InputLabel>Miles Away</InputLabel>
        <Select value={miles} onChange={(e) => setMiles(e.target.value)}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, idx) => (
          <Grid item key={idx} xs={12}>
             <PlaceDetails
               place={place}
               selected={Number(childClicked) === idx}
               refProp={elRefs[idx]}
               deleteLocation={deleteLocation}
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