import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import firebase from "firebase"
import fire from "../../../database"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ data, isOPen, onClose, renderDialogBody, title, onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {

    onClose()

  };

  const handleSubmit = () => {

    onSubmit()
  }

  return (

    <Dialog
      open={isOPen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth={`sm`}
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        {renderDialogBody()}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary" >
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
}