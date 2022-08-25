import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoteForm from "./pages/NoteForm";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="send-note" element={<NoteForm />} />
      </Route>
    </Routes>
  );
}

export default App;
