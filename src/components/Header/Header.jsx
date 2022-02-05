import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({ setCoordinates}) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng});
  }

  return (
    <AppBar position="static" className={classes.bar} >
      <Toolbar className={classes.toolbar}>
          <Typography variant="h4" className={classes.title}>
              wichFinder
          </Typography>

          <Button size="large" color="inherit" onClick={() => window.open('https://wichfinder.creator-spring.com/listing/sandwich-minimalist', '_blank')}>
            Merch
          </Button>

          <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore New Sandwiches
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
            </div>
          </Autocomplete>
          </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;