import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React from 'react';

export const AlertDialog = (props: AlertDialogProps) => {
  const { isOpen, message, handleClose, handleConfirm } = props;
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleConfirm} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type AlertDialogProps = {
  isOpen: boolean;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
};
