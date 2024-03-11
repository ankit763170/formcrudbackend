// App.js
import React, { useState } from "react";
import Tablecomp from "./components/Tablecomp";

function App() {
  const [Name, setName] = useState("");

  return (
    <>
      <Tablecomp />
    </>
  );
}

export default App;
