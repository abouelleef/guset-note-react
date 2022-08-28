import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { PersonAdd, Send } from "@mui/icons-material";
import EmailsArray from "../components/EmailsArray";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ImageUpload from "../components/ImageUpload";
import {
  useSendNoteMutation,
  useSendNotificationMutation,
} from "../services/notesApi";
import { useNavigate } from "react-router-dom";

export default function NoteFrom() {
  // const [isSubscribed, setIsSubscribed] = React.useState(false);
  // const [subscription, setSubscription] = React.useState(null);
  // const [registration, setRegistration] = React.useState(null);

  // const base64ToUint8Array = (base64) => {
  //   const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  //   const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  //   const rawData = window.atob(b64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // };

  // React.useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     "serviceWorker" in navigator &&
  //     window.workbox !== undefined
  //   ) {
  //     // run only in browser
  //     navigator.serviceWorker.ready.then((reg) => {
  //       reg.pushManager.getSubscription().then((sub) => {
  //         if (
  //           sub &&
  //           !(
  //             sub.expirationTime &&
  //             Date.now() > sub.expirationTime - 5 * 60 * 1000
  //           )
  //         ) {
  //           setSubscription(sub);
  //           setIsSubscribed(true);
  //         }
  //       });
  //       setRegistration(reg);
  //       subscribeButtonOnClick();
  //     });
  //   }
  // }, []);

  // const subscribeButtonOnClick = async (event) => {
  //   // event.preventDefault();
  // const sub = await registration.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: base64ToUint8Array(
  //     process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY
  //   ),
  // });
  //   sendNotification(subscription);

  //   // TODO: you should call your API to save subscription data on server in order to send web push notification from server
  //   setSubscription(sub);
  //   setIsSubscribed(true);
  //   console.log("web push subscribed!");
  //   console.log(sub);
  // };

  // const unsubscribeButtonOnClick = async (event) => {
  //   event.preventDefault();
  //   await subscription.unsubscribe();
  //   // TODO: you should call your API to delete or invalidate subscription data on server
  //   setSubscription(null);
  //   setIsSubscribed(false);
  //   console.log("web push unsubscribed!");
  // };

  // const sendNotificationButtonOnClick = async (event) => {
  //   // event.preventDefault();
  //   if (subscription == null) {
  //     console.error("web push not subscribed");
  //     return;
  //   }
  // };

  const navigate = useNavigate();

  // const [sendNotification] = useSendNotificationMutation();
  const [emails, setEmails] = React.useState([]);
  const [emailInput, setEmailInput] = React.useState("");
  const [noteType, setNoteType] = React.useState("congrats");
  const [images, setImages] = React.useState([]);

  const [sendNote] = useSendNoteMutation();

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      // TODO:
      title: data.get("title"),
      body: data.get("body"),
      type: data.get("type"),
      emailsData: emails,
      media: images,
    });

    const fd = new FormData();
    fd.append("title", data.get("title"));
    fd.append("body", data.get("body"));
    fd.append("type", data.get("type"));
    fd.append("emailsData", emails);
    images.forEach((image) => {
      fd.append("media", image.file);
    });

    await sendNote(fd);
    navigate("/");
  };

  const addEmail = () => {
    if (emails.includes(emailInput) || !emailInput) return;
    setEmails([...emails, emailInput]);
    setEmailInput("");
  };

  const selectNoteType = (e) => {
    setNoteType(e.target.value);
  };
  const noteTypes = ["congrats", "invitation"];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Send Note
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl sx={{ mb: 2, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="email">Emails</InputLabel>
            <OutlinedInput
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={addEmail} edge="end">
                    <PersonAdd />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <EmailsArray emails={emails} setEmails={setEmails} />

          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="Note Title"
            type="text"
            id="title"
          />

          <TextField
            margin="normal"
            multiline
            minRows={3}
            required
            fullWidth
            name="body"
            label="Note Body"
            type="text"
            id="body"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            select
            name="type"
            label="Note Type"
            value={noteType}
            onChange={selectNoteType}
            helperText="Please select Note Type"
          >
            {noteTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <ImageUpload images={images} setImages={setImages} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<Send />}
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
