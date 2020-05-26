import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "react-navi";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

import SendEmailDialog from "../components/SendEmailDialog";
import { getProfile, getEmails, sendEmail } from "../api";
import { AuthContext } from "../support/AuthContext";
import {
  removeLocalStorageItem,
  getLocalStorageItem,
} from "../support/localStorageUtils";
import EmailDetailsDialog from "../components/EmailDetailsDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

const Mailer = () => {
  // hooks
  const navigation = useNavigation();
  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailodalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    getLocalStorageItem("token")
      ? handleGetProfile()
      : navigation.navigate("/login");
  }, []); // eslint-disable-line

  useEffect(() => {
    if (user) handleGetEmails();
  }, [user]);

  // functions
  const handleGetProfile = () => {
    getProfile()
      .then((res: any) => setUser(res.data))
      .catch(() => {
        removeLocalStorageItem("token");
        navigation.navigate("/login");
      });
  };

  const handleGetEmails = () => {
    getEmails()
      .then((res: any) => setEmails(res.data))
      .catch((err) => console.error(err));
  };

  const handleSendEmail = (email: any) => {
    sendEmail(email)
      .then((res: any) => console.log(res))
      .then(() => handleGetEmails())
      .catch((err) => console.error(err));
  };

  const handleSelectItem = (email: Email) => {
    setSelectedEmail(email);
    setDetailodalOpen(true);
  };

  const formatTime = (time: string): string => {
    const date = new Date(time);
    return date.toUTCString();
  };

  // render
  return (
    <Container component="main" maxWidth="sm">
      {user ? (
        <div>
          <Typography variant="h4">Welcome {user.name}!</Typography>

          <Box
            mt={3}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Last sent emails:</Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCreateModalOpen(true)}
            >
              New Email
            </Button>
          </Box>
          <Paper variant="outlined">
            <List className={classes.root}>
              {emails.map((email: Email, idx: number) => (
                <ListItem
                  alignItems="flex-start"
                  divider={idx < emails.length - 1}
                  key={email.id}
                  selected={selectedEmail?.id === email.id}
                  onClick={() => handleSelectItem(email)}
                >
                  <ListItemText
                    primary={email.subject}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {email.to}
                        </Typography>
                        {` — ${formatTime(email.sent_at)}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <SendEmailDialog
            open={createModalOpen}
            onSubmit={handleSendEmail}
            onClose={() => setCreateModalOpen(false)}
          />
          <EmailDetailsDialog
            open={detailModalOpen}
            email={selectedEmail}
            onClose={() => {
              setDetailodalOpen(false);
              setSelectedEmail(null);
            }}
          />
        </div>
      ) : (
        <span>Loading</span>
      )}
    </Container>
  );
};

export default Mailer;
