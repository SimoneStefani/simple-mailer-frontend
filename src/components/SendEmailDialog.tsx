import React, { useState } from "react";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

type Props = {
  onSubmit: (content: NewEmail) => void;
  open: boolean;
  onClose: () => void;
};

const SendEmailDialog = ({ onSubmit, open, onClose }: Props) => {
  // hooks
  const clearForm: NewEmail = { to: "", subject: "", content: "" };
  const [email, setEmail] = useState(clearForm);

  // functions
  const handleSubmit = () => {
    onSubmit(email);
    setEmail(clearForm);
    onClose();
  };

  // render
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Compose a new email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here you can write a new email. This simpler email implement one level
          of redundancy leveraging two mailing providers. If one fails to send
          your email this service will automatically switch to the other.
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendEmailDialog;
