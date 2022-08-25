import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">Guest Note App </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
