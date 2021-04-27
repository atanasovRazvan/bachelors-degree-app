import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
import meterSource from '../utils/DisplayEstimationHelper';
import noImage from '../utils/noimages.jpg';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  meter: {
    height: '35px',
    width: '60px',
    right: '1rem',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const ApartmentCard = ({ apartment }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={apartment.displayImage === '' ? noImage : apartment.displayImage}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {apartment.shortDescription}
          </Typography>
          <hr />
          <ListItem ContainerComponent="div">
            <ListItemIcon>
              <Chip label={`Pret: ${apartment.price} EUR`} variant="outlined" />
            </ListItemIcon>
            <ListItemSecondaryAction>
              <CardMedia
                className={classes.meter}
                image={`${meterSource(Number(apartment.price), Number(apartment.estimatedPrice))}`}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Typography variant="body2" component="li">
            {`Cartier: ${apartment.neighbourhood}`}
          </Typography>
          <Typography variant="body2" component="li">
            {`Camere: ${apartment.noRooms}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="outlined"
          >
            <Link href={`/apartment/${apartment.id}`}>
              Vezi detalii
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

ApartmentCard.propTypes = {
  apartment: PropTypes.instanceOf(Object).isRequired,
};

export default ApartmentCard;
