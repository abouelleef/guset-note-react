import { Grid } from "@mui/material";
import NoteCard from "../components/NoteCard";

function NoteList({ notes }) {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      {notes.map((note) => (
        <Grid item xs={12} sm={6} key={note.id}>
          <NoteCard
            title={note.title}
            body={note.body}
            images={note.media}
            noteId={note.id}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default NoteList;
