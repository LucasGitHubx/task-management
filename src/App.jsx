import DisplayTasks from "./components/DisplayTasks";
import Form from "./components/Form";
import Header from "./components/Header";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }),
    [data];

  return (
    <div className="app">
      <Header />
      <Context.Provider value={[data, setData]}>
        <Form />
        <DisplayTasks />
      </Context.Provider>
    </div>
  );
}
