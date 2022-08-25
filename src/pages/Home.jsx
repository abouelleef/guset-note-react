import { Container } from "@mui/material";
import NoteList from "../components/NoteList";
import { useGetAllNotesQuery } from "../services/notesApi";

function Home() {
  const { data, error, isLoading } = useGetAllNotesQuery("bulbasaur");
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
