import React, { useState } from "react";
import { Nav } from "..";

function Modules() {
  const [currentData, setCurrentData] = useState<string>("modules");
  return (
    <div>
      <Nav setCurrentData={setCurrentData} currentData={currentData} />
      index
    </div>
  );
}

export default Modules;
