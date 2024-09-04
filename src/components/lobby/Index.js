import React from "react";

import CasinoGamesComponent from "./body";
import CasinoLayout from "./casinoLayout";
import { useParams } from "react-router-dom";
import CasinoOptions from "./casinoOptions";

const CasinoIndex = () => {
  const { provider, category } = useParams();

  return (
    <CasinoLayout>
     { provider? <CasinoOptions provider={provider} category={category} />: <CasinoGamesComponent />}  
    </CasinoLayout>
  );
};
export default CasinoIndex;
