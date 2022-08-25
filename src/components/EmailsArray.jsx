import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function EmailsArray({ emails, setEmails }) {
  const handleDelete = (chipToDelete) => () => {
    setEmails((chips) =>
      chips.filter((chip, i, array) => array.indexOf(chip) !== chipToDelete)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        width: "100%",
        minHeight: "48px",
      }}
      component="ul"
    >
      {emails.map((data, i) => {
        return (
          <ListItem key={i}>
            <Chip label={data} onDelete={handleDelete(i)} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
