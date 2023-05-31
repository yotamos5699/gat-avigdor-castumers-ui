import React, { useState } from "react";
import { Nav } from "..";
import { useQuery } from "@tanstack/react-query";

function Modules() {
  const [currentData, setCurrentData] = useState<string>("modules");

  return (
    <div>
      <Nav setCurrentData={setCurrentData} currentData={currentData} />
    </div>
  );
}

export default Modules