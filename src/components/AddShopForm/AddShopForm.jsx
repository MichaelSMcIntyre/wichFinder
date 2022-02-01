import React, { useState, useEffect} from 'react';
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Button, Card } from '@material-ui/core';

import useStyles from './styles.js';

const AddShopForm = ({ type, setType, inputLat, setInputLat, inputLng, setInputLng, inputName, setInputName,
                inputPrice, setInputPrice, inputSandwiches, setInputSandwiches, inputAddress, setInputAddress,
                inputPhone, setInputPhone, inputPhoto, setInputPhoto, inputWebsite, setInputWebsite, inputReview, setInputReview,
                addLocation
              }) => {
  const classes = useStyles();

  return (
    <Card className={classes.container} elevation={2}>
      <Typography variant="h4">Add New Shop</Typography>
      <>
      <FormControl className={classes.formControl}>
        <TextField label="Latitude" variant="outlined" value={inputLat} onChange={(e) => setInputLat(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Longitude" variant="outlined" value={inputLng} onChange={(e) => setInputLng(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Shop Name" variant="outlined" value={inputName} onChange={(e) => setInputName(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select variant="outlined" value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value={''}>none</MenuItem>
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
      <FormControl className={classes.formControl}>
        <InputLabel>Price</InputLabel>
        <Select variant="outlined" value={inputPrice} onChange={(e) => setInputPrice(e.target.value)}>
          <MenuItem value={'$'}>$</MenuItem>
          <MenuItem value={'$$'}>$$</MenuItem>
          <MenuItem value={'$$$'}>$$$</MenuItem>
          <MenuItem value={'$$$$'}>$$$$</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Favorite Sandwiches" variant="outlined" value={inputSandwiches} onChange={(e) => setInputSandwiches(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Address" variant="outlined" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Phone" variant="outlined" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Photo" variant="outlined" value={inputPhoto} onChange={(e) => setInputPhoto(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField label="Website" variant="outlined" value={inputWebsite} onChange={(e) => setInputWebsite(e.target.value)} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField multiline variant="outlined" rows={4} label="Review" value={inputReview} onChange={(e) => setInputReview(e.target.value)} />
      </FormControl>
      <Button variant="contained" color="green" onClick={(e) => addLocation()}>
        Add Location
      </Button>
      </>
    </Card>
  );
}

export default AddShopForm;