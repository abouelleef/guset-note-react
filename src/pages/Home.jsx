import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import {
  useGetAllNotesQuery,
  useSubscribeMutation,
} from "../services/notesApi";

function Home() {
  const { data, error, isLoading } = useGetAllNotesQuery();

  const [subscribeMutation] = useSubscribeMutation();

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
