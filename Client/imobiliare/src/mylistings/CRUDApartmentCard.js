import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, makeStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import formatDate from '../utils/DateFormatting';
import 'draft-js/dist/Draft.css';
import ApartmentImages from './ApartmentImages';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: 'fit-content',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    margin: theme.spacing(1),
  },
  inline: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  leftArea: {
    marginLeft: theme.spacing(1),
  },
  rightArea: {
    width: '50%',
    marginRight: theme.spacing(1),
  },
  centered: {
    margin: 'auto',
    textAlign: 'center',
    width: '75%',
  },
  small: {
    maxWidth: '100px',
  },
}));

const CRUDApartmentCard = ({ apartment }) => {
  const classes = useStyles();
  const fields = ['squareMeters', 'noRooms', 'city', 'neighbourhood', 'street', 'floor'];
  const labels = ['Metri patrati', 'Camere', 'Oras', 'Cartier', 'Strada', 'Etajul'];

  const [apartmentInfo, setApartmentInfo] = useState(apartment);
  const [isDeleted, setIsDeleted] = useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const addImage = async (base64image) => {
    const newImage = {
      id: `new${generateUniqueID()}`,
      source: base64image,
      apartmentId: apartmentInfo.id,
      isDisplay: false,
    };

    setApartmentInfo({
      ...apartmentInfo,
      imageSources: [...apartmentInfo.imageSources, newImage],
    });
  };

  const removeImage = (id) => {
    setApartmentInfo({
      ...apartmentInfo,
      imageSources: apartmentInfo.imageSources.filter((img) => img.id !== id),
    });
  };

  const setDisplay = (id) => {
    setApartmentInfo({
      ...apartmentInfo,
      imageSources: apartmentInfo.imageSources.map((img) => {
        if (img.id === id) {
          return { ...img, isDisplay: true };
        }
        return { ...img, isDisplay: false };
      }),
    });
  };

  const deleteApartment = (id) => {
    console.log(id);
    setIsDeleted(true);
  };

  const updateApartment = () => {
    console.log(apartmentInfo.id);
  };

  return (
    isDeleted ? null
      : (
        <div className={classes.root}>
          <Card>
            <ApartmentImages
              images={apartmentInfo.imageSources}
              addImage={addImage}
              removeImage={removeImage}
              setDisplay={setDisplay}
            />

            <hr />
            <div className={classes.centered}>
              {isEditable
                ? (
                  <TextField
                    fullWidth
                    value={apartmentInfo.title}
                    onChange={(e) => setApartmentInfo({ ...apartmentInfo, title: e.target.value })}
                  />
                )
                : (
                  <Typography variant="h4">
                    {apartmentInfo.title}
                  </Typography>
                )}
            </div>
            <hr />

            <CardContent className={classes.content}>
              <div className={classes.leftArea}>
                {fields.map((field, index) => (
                  <Typography
                    key={field}
                    component="li"
                    variant="h6"
                    className={classes.field}
                  >
                    {`${labels[index]}: `}
                    {isEditable
                      ? (
                        <TextField
                          className={classes.small}
                          value={apartmentInfo[field]}
                          onChange={(e) => setApartmentInfo(
                            { ...apartmentInfo, [field]: e.target.value },
                          )}
                        />
                      )
                      : apartmentInfo[field]}
                  </Typography>
                ))}
              </div>
              <div className={classes.rightArea}>
                <div className={classes.inline}>
                  {isEditable
                    ? (
                      <TextField
                        value={`${apartmentInfo.price}EUR`}
                        className={classes.small}
                        variant="outlined"
                        label="Pret"
                        onChange={(event) => setApartmentInfo(
                          {
                            ...apartmentInfo,
                            price: event.target.value.substring(0, event.target.value.length - 3),
                          },
                        )}
                      />
                    )
                    : <Chip label={`Pret: ${apartmentInfo.price} EUR`} variant="outlined" />}
                  <Typography variant="h6">
                    {formatDate(apartmentInfo.createdAt)}
                  </Typography>
                </div>

                <TextField
                  id="outlined-multiline-static"
                  label="Descriere"
                  placeholder="Alte informatii despre apartament"
                  multiline
                  fullWidth
                  rows={7}
                  variant="outlined"
                  value={apartmentInfo.description}
                  disabled={!isEditable}
                  onChange={(e) => setApartmentInfo(
                    {
                      ...apartmentInfo,
                      description: e.target.value,
                    },
                  )}
                />
              </div>
            </CardContent>
            <CardActions>
              {isEditable
                ? (
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setIsEditable(false);
                      updateApartment();
                    }}
                  >
                    Salveaza
                  </Button>
                )
                : (
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setIsEditable(true);
                    }}
                  >
                    Modifica
                  </Button>
                )}
              <Button
                size="small"
                color="secondary"
                variant="contained"
                disabled={isEditable}
                onClick={() => deleteApartment(apartmentInfo.id)}
              >
                Sterge
              </Button>
            </CardActions>
          </Card>
        </div>
      )
  );
};

CRUDApartmentCard.propTypes = {
  apartment: PropTypes.instanceOf(Object).isRequired,
};

export default CRUDApartmentCard;
