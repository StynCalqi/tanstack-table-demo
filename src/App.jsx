import { useState } from "react";

import defaultData from "./data/defaultData";
import DraggableTable from "./components/DraggableTable";
import "./App.css";

function App() {
  const [data, setData] = useState(() => [...defaultData]);
  return <DraggableTable data={data} setData={setData} />;
}

export default App;
