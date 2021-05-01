import React, { useEffect, useState } from 'react';
import { Button, Container, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { ExpandMore } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PhotoSlider from '../utils/PhotoSlider';
import meterSource from '../utils/DisplayEstimationHelper';
import serverUrl, { defaultProfilePicture } from '../utils/constants';
import config from '../utils/config';
import formatDate from '../utils/DateFormatting';
import UserInfoModal from './UserInfoModal';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  centered: {
    textAlign: 'center',
  },
  root: {
    maxWidth: 'sm',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    height: '63px',
    width: '63px',
    backgroundColor: red[500],
  },
  gridContainer: {
    textAlign: 'center',
  },
  description: {
    whiteSpace: 'pre-line',
  },
}));

const ApartmentDetails = () => {
  const classes = useStyles();
  const { id } = useParams('id');

  const [apartmentInfo, setApartmentInfo] = useState(null);

  const [userAvatarSrc, setUserAvatarSrc] = useState(defaultProfilePicture);
  const [expanded, setExpanded] = React.useState(false);
  const [displayUserInfo, setDisplayUserInfo] = React.useState(false);

  const listFields = ['squareMeters', 'noRooms', 'city', 'neighbourhood', 'street', 'floor'];
  const labels = ['Metri patrati', 'Camere', 'Oras', 'Cartier', 'Strada', 'Etajul'];

  useEffect(() => {
    axios.get(`${serverUrl}/apartment/${id}`, config)
      .then((res) => {
        setApartmentInfo(res.data);
        setUserAvatarSrc(res.data.avatarSrc);
      })
      .catch(() => {
      });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    apartmentInfo
      ? (
        <>
          <UserInfoModal
            open={displayUserInfo}
            onCloseModal={() => setDisplayUserInfo(false)}
            apartment={apartmentInfo}
          />
          <CssBaseline />
          <Container className={classes.heroContent} maxWidth="sm">
            <Card className={classes.root}>
              <CardHeader
                avatar={(
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={userAvatarSrc}
                    onError={() => setUserAvatarSrc(defaultProfilePicture)}
                  />
                      )}
                action={(
                  <img
                    src={meterSource(apartmentInfo?.price, apartmentInfo?.estimatedPrice)}
                    alt="Price Estimation"
                  />
                      )}
                title={`${apartmentInfo?.firstName} ${apartmentInfo?.lastName}`}
                subheader={formatDate(apartmentInfo?.createdAt)}
              />
              <CardContent>
                <hr />
                <Typography variant="h5" className={classes.centered}>
                  {apartmentInfo?.title}
                </Typography>
                <hr />
                <PhotoSlider images={apartmentInfo?.imageSources} />
                <hr />
                <Grid container spacing={2} justify="space-evenly" className={classes.gridContainer}>
                  {listFields.map((field, index) => {
                    if (apartmentInfo && apartmentInfo[field].length > 0) {
                      return (
                        <Grid key={labels[index]} item xs={12} sm={6}>
                          <Typography component="li" variant="body2">
                            {`${labels[index]}: ${apartmentInfo[field]}`}
                          </Typography>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setDisplayUserInfo(true)}
                >
                  Contacteaza proprietarul
                </Button>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMore />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" className={classes.description}>
                    {apartmentInfo?.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Container>
        </>
      )
      : null
  );
};

export default ApartmentDetails;
