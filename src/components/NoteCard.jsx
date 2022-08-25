import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDeleteNoteMutation } from "../services/notesApi";

export default function NoteCard({ title, body, images, noteId }) {
  const [deleteNote] = useDeleteNoteMutation();

  const deleteNoteHandler = async () => {
    await deleteNote(noteId);
  };
  return (
    <Card sx={{ maxWidth: 345, mx: "auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            images
              ? `${process.env.REACT_APP_BASE_URL}images/notes/${
                  images.split(",")[0]
                }`
              : null
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={deleteNoteHandler}>
          archive
        </Button>
      </CardActions>
    </Card>
  );
}
