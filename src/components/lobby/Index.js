import React, { useEffect } from "react";

import CasinoGamesComponent from "./body";
import CasinoLayout from "./casinoLayout";
import { useParams } from "react-router-dom";
import CasinoOptions from "./casinoOptions";
import './index.css';
import { useDispatch } from "react-redux";
import {
  setState as setVirtualGame,
} from "../../redux/virtualsSlice";
const CasinoIndex = () => {
  const { provider, category } = useParams();
  const dispatch =useDispatch()


  useEffect(() => {

    return () => {
      dispatch(setVirtualGame("casino_search", []));
    }
  
    },[] )

  return (
    <CasinoLayout>
     { provider? <CasinoOptions provider={provider} category={category} />: <CasinoGamesComponent />}  
    </CasinoLayout>
  );
};
export default CasinoIndex;
