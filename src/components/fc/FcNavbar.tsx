import React from "react";
import { Lm } from "../../types";

import { FcSelector } from ".";
import "./styles/FcNavbar.css";

interface Props {
  lmArray: Lm[];
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcNavbar = ({ lmArray, lmIndex, fcIndex, setFcIndex }: Props) => {
  return (
    <div id="fcNavbarContainer">
      <p id="fcHeader">Flashcards:</p>
      <div id="fcNavbarSpacer"></div>
      <FcSelector
        lmArray={lmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
        setFcIndex={setFcIndex}
      />
    </div>
  );
};

export { FcNavbar };
