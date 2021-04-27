import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const NotFound = () => (
  <div>
    <CssBaseline />
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Container maxWidth="sm">
        <Box mb={3}>
          <Typography align="center" color="textPrimary" gutterBottom variant="h1">
            404 Error
          </Typography>
          <Typography align="center" color="textSecondary" gutterBottom variant="body2">
            Page Not Found
          </Typography>
        </Box>
      </Container>
    </Box>
  </div>
);

export default NotFound;
