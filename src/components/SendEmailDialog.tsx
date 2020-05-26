import React, { useState } from "react";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

type Props = {
  onSubmit: (content: any) => void;
  open: boolean;
  onClose: () => void;
};

const SendEmailDialog = ({ onSubmit, open, onClose }: Props) => {
  // hooks
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    content: "",
  });

  // functions
  const handleSubmit = () => {
    onSubmit(email);
    onClose();
  };

  // render
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Compose a new email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here.We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          placeholder="Recipient Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email.to}
          onChange={(e) => setEmail({ ...email, to: e.target.value })}
        />
        <TextField
          required
          margin="dense"
          placeholder="Subject"
          fullWidth
          variant="outlined"
          value={email.subject}
          onChange={(e) => setEmail({ ...email, subject: e.target.value })}
        />
        <TextField
          required
          margin="dense"
          placeholder="Content"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={email.content}
          onChange={(e) => setEmail({ ...email, content: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendEmailDialog;
