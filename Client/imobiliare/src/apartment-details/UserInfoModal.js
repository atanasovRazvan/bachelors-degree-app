import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { Backdrop, makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.primary.light,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserInfoModal = ({ open, onCloseModal, apartment }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2>{`${apartment?.firstName} ${apartment?.lastName}`}</h2>
          <p>
            Numar de telefon:
            {' '}
            <strong>{apartment?.phoneNumber}</strong>
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

UserInfoModal.propTypes = {
  apartment: PropTypes.instanceOf(Object),
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

UserInfoModal.defaultProps = {
  apartment: null,
};

export default UserInfoModal;
