import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';

import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, refProp, deleteLocation, isAdmin }) => {
  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  var distance = Math.round(place.distance * 10) / 10;

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo : 'https://www.saveur.com/uploads/2019/02/08/2TMDVDYTWLFWZEJWWE3FWRUGYA.jpg?auto=webp'}
        title={place.name}

      />
      <CardContent>
       <Typography gutterBottom variant="h5">{place.name}</Typography>
       <Box display="flex" justifyContent="space-between">
         <Typography variant="subtitle1">Price</Typography>
         <Typography gutterBottom variant="subtitle1">{place.price ? place.price : '$'}</Typography>
       </Box>
       <Box display="flex" justifyContent="space-between">
         <Typography variant="subtitle1">Miles Away</Typography>
         <Typography gutterBottom variant="subtitle1">{ distance ? distance : '0'}</Typography>
       </Box>
       <Box display="flex" justifyContent="space-between">
         <Typography variant="subtitle1">Type</Typography>
         <Typography gutterBottom variant="subtitle1">{ place.type !== '' ? place.type  : 'Americana'}</Typography>
       </Box>
       {place?.sandwiches?.map((sandwich) => (
         <Box my={1} display="flex" justifyContent="space-between" alignItems="cent">
           <img src={'https://cdn-icons-png.flaticon.com/512/1691/1691118.png'} alt={sandwich.name} height={30} width={30}/>
           <Typography variant="subtitle2" color="textSecondary">{sandwich}</Typography>
         </Box>
       ))}
       {place?.features?.map((feature) =>(
        <Chip key={feature} size="small" label={feature} className={classes.chip} />
       ))}

        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        )}


        {place.phone && (
        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
          <PhoneIcon /> {place.phone}
        </Typography>
        )}

        <CardActions >
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>
          {isAdmin ?  (
           <CardActions >
          <Button size="small" color="primary" onClick={() => deleteLocation(place.id)}>
            DELETE this location
          </Button>
          </CardActions>
          ) : (
            <></>
          )}


      </CardContent>
    </Card>
  );
}

export default PlaceDetails;