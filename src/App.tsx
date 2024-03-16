import { Dispatch, SetStateAction, createContext, useState } from "react";
import "./App.css";
import TreePage from "./pages/TreePage";

export type ContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextType | null>(null);

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Context.Provider
        value={{
          open,
          setOpen,
        }}
      >
        <TreePage />
      </Context.Provider>
    </>
  );
};

export default App;
