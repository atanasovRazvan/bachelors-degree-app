import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import ApartmentCard from './ApartmentCard';
import config from '../utils/config';
import serverUrl from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ApartmentList = () => {
  const classes = useStyles();
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/apartments`, config)
      .then((res) => setApartments(res.data));
  }, []);

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Lista anunturilor
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Navigheaza prin lista de anunturi din zona ta. Alege pretul cel mai convenabil
              folosindu-te de estimatorul nostru! Vrei sa postezi propriul anunt? Creeaza-ti
              un cont prin butonul de mai jos!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link href="/register" color="inherit">
                      Creeaza cont
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <Link href="/login" color="inherit">
                      Conecteaza-te
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
              />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          © iMobiliare
        </Typography>
        <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
          Contacteaza-ne
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          Email: atanasov.razvan99@gmail.com
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          Numar de telefon: +40 755 376 395
        </Typography>
      </footer>
      {/* End footer */}
    </>
  );
};

export default ApartmentList;
