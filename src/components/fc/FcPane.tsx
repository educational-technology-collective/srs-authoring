import { Flashcard, LmFcs } from "../../types";

import { FcNavbar, FcMcqDisplay, FcQaDisplay, FcCreator } from ".";
import "./styles/FcPane.css";

interface Props {
  fcArray: Flashcard[];
  setFcArray: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
  lm_id: string;
}

const FcPane = ({
  fcArray,
  setFcArray,
  fcIndex,
  setFcIndex,
  lmFcs,
  setLmFcs,
  lm_id,
}: Props) => {
  return (
    <div id="fcPaneContainer">
      {fcArray && (
        <FcNavbar
          fcIndex={fcIndex}
          setFcIndex={setFcIndex}
          numFcs={fcArray.length}
        />
      )}
      {fcArray && fcArray.length > 0 && fcArray[fcIndex].type === "m" && (
        <FcMcqDisplay
          fcArray={fcArray}
          setFcArray={setFcArray}
          fcIndex={fcIndex}
          setFcIndex={setFcIndex}
          lmFcs={lmFcs}
          setLmFcs={setLmFcs}
        />
      )}
      {fcArray && fcArray.length > 0 && fcArray[fcIndex].type === "q" && (
        <FcQaDisplay
          fcArray={fcArray}
          setFcArray={setFcArray}
          fcIndex={fcIndex}
          setFcIndex={setFcIndex}
          lmFcs={lmFcs}
          setLmFcs={setLmFcs}
        />
      )}
      {fcArray && lmFcs[lm_id] != null && (
        <FcCreator
          fcArray={fcArray}
          setFcArray={setFcArray}
          setFcIndex={setFcIndex}
          lmFcs={lmFcs}
          setLmFcs={setLmFcs}
          lm_id={lm_id}
        />
      )}
    </div>
  );
};

export { FcPane };
