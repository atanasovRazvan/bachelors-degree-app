import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, IconButton, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { AddBoxRounded, Cancel } from '@material-ui/icons';
import convertBase64 from '../utils/base64';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '125px',
    width: '125px',
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  setDisplay: {
    position: 'absolute',
    transform: 'translate(30%, 350%)',
  },
  deleteButton: {
    position: 'absolute',
    transform: 'translate(-40%, -40%)',
  },
  hidden: {
    display: 'none',
  },
}));

const ApartmentImages = ({
  images, addImage, removeImage, setDisplay,
}) => {
  const classes = useStyles();

  const renderAddButtons = () => {
    const buttons = [];
    for (let index = 0; index < 5 - images.length; index += 1) {
      buttons.push(
        <div key={index}>
          <input
            accept="image/*"
            id={`button${index}`}
            type="file"
            multiple
            className={classes.hidden}
            onChange={async (event) => addImage(await convertBase64(event.target.files[0]))}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={`button${index}`}>
            <IconButton
              className={classes.image}
              component="span"
            >
              <AddBoxRounded color="primary" className={classes.image} />
            </IconButton>
          </label>
        </div>,
      );
    }
    return buttons;
  };

  return (
    <div className={classes.container}>
      {images.map((image) => (
        <CardMedia
          className={classes.image}
          key={image.id}
          image={image.source}
        >
          <IconButton
            color="secondary"
            className={classes.deleteButton}
            onClick={() => removeImage(image.id)}
          >
            <Cancel />
          </IconButton>
          {image.isDisplay ? null
            : (
              <Button
                className={classes.setDisplay}
                color="secondary"
                variant="contained"
                size="small"
                onClick={() => setDisplay(image.id)}
              >
                Display
              </Button>
            )}
        </CardMedia>
      ))}

      {renderAddButtons()}
    </div>
  );
};

ApartmentImages.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired,
  addImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  setDisplay: PropTypes.func.isRequired,
};

export default ApartmentImages;
