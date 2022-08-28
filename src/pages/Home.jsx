import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import { WEB_PUSH_PUBLIC_KEY } from "../config";
import {
  useGetAllNotesQuery,
  useSubscribeMutation,
} from "../services/notesApi";
import { base64ToUint8Array } from "../serviceWorkerDev";

function Home() {
  const { data, error, isLoading } = useGetAllNotesQuery();

  const [subscribeMutation] = useSubscribeMutation();

  useEffect(() => {
    (async () => {
      if (Notification.permission === "granted") {
        const registration = await navigator.serviceWorker.getRegistration();
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(WEB_PUSH_PUBLIC_KEY),
          });
        }
        subscribeMutation(subscription);
      }
    })();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <Container sx={{ mt: 2 }}>
      {console.log(data)}
      {data && <NoteList notes={data.notes} />}
    </Container>
  );
}

export default Home;
