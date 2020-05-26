import React from "react";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { formatTime } from "../support/utils";

type Props = {
  email: Email | null;
  open: boolean;
  onClose: () => void;
};

const EmailDetailsDialog = ({ email, open, onClose }: Props) => {
  // render

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {email && (
        <>
          <DialogTitle id="form-dialog-title">{email.subject}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <small>
                Sent to {email.to} on {formatTime(email.sent_at)}
              </small>
            </DialogContentText>
            <DialogContentText>{email.content}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EmailDetailsDialog;
