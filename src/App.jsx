import { useState } from "react";

import defaultData from "./data/defaultData";
import DraggableTable from "./components/DraggableTable";
import DecimalsSelect from "./components/DecimalsSelect";

import "./App.css";

function App() {
  const [data, setData] = useState(() => [...defaultData]);
  const [selectedDecimal, setSelectedDecimal] = useState("2");

  return (
    <section>
      <DecimalsSelect
        selectedDecimal={selectedDecimal}
        setSelectedDecimal={setSelectedDecimal}
      />

      <DraggableTable
        data={data}
        selectedDecimal={selectedDecimal}
        setData={setData}
      />
    </section>
  );
}

export default App;
