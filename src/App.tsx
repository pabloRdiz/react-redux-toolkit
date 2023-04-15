import "./App.css";
import CreateNewUser from "./components/CreateNewUSer";
import ListOfUsers from "./components/ListOfUsers";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <h1>React Redux Toolkit</h1>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  );
}

export default App;
