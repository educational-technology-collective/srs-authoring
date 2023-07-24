import React from "react";

import { FcSelector } from ".";
import "./styles/FcNavbar.css";

interface Props {
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  numFcs: number;
}

const FcNavbar = ({ fcIndex, setFcIndex, numFcs }: Props) => {
  return (
    <div id="fcNavbarContainer">
      <p id="fcHeader">Flashcards:</p>
      <div id="fcNavbarSpacer"></div>
      <FcSelector fcIndex={fcIndex} setFcIndex={setFcIndex} numFcs={numFcs} />
    </div>
  );
};

export { FcNavbar };
