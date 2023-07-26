import { Lm } from "../../types";

import { FcNavbar, FcMcqDisplay, FcQaDisplay, FcCreator } from ".";
import "./styles/FcPane.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcPane = ({
  lmArray,
  setLmArray,
  lmIndex,
  fcIndex,
  setFcIndex,
}: Props) => {
  return (
    <div id="fcPaneContainer">
      <FcNavbar
        lmArray={lmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
        setFcIndex={setFcIndex}
      />
      {lmArray.length > 0 &&
        lmArray[lmIndex].flashcards.length > 0 &&
        lmArray[lmIndex].flashcards[fcIndex].type === "mcq" && (
          <FcMcqDisplay
            lmArray={lmArray}
            setLmArray={setLmArray}
            lmIndex={lmIndex}
            fcIndex={fcIndex}
            setFcIndex={setFcIndex}
          />
        )}
      {lmArray.length > 0 &&
        lmArray[lmIndex].flashcards.length > 0 &&
        lmArray[lmIndex].flashcards[fcIndex].type === "qa" && (
          <FcQaDisplay
            lmArray={lmArray}
            setLmArray={setLmArray}
            lmIndex={lmIndex}
            fcIndex={fcIndex}
            setFcIndex={setFcIndex}
          />
        )}
      <FcCreator
        lmArray={lmArray}
        setLmArray={setLmArray}
        lmIndex={lmIndex}
        setFcIndex={setFcIndex}
      />
    </div>
  );
};

export { FcPane };
