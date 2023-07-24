import { FormEvent } from "react";
import { Flashcard, LmFcs } from "../../types";
import { getFcPosition, makeDeleteReq, makePutReq } from "../../utils";

import { FcVisibilityDropdown } from ".";

interface Props {
  fcArray: Flashcard[];
  setFcArray: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
  qBuffer: string;
  aBuffer: string;
}

const FcToolbar = ({
  fcArray,
  setFcArray,
  fcIndex,
  setFcIndex,
  lmFcs,
  setLmFcs,
  qBuffer,
  aBuffer,
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newFcArray: Flashcard[] = JSON.parse(JSON.stringify(fcArray));

    newFcArray[fcIndex].content.question = qBuffer;
    if (fcArray[fcIndex].type === "m") {
      newFcArray[fcIndex].content.answer = JSON.parse(aBuffer);
    } else if (fcArray[fcIndex].type === "q") {
      newFcArray[fcIndex].content.answer = aBuffer;
    }

    // Push changes to server.
    const payload = newFcArray[fcIndex];
    console.log("payload:", payload);
    makePutReq("/flashcards", payload);

    // Push changes locally.
    setFcArray(newFcArray);
    setFcIndex(getFcPosition(newFcArray, payload));
    lmFcs[payload.lmId][fcIndex] = payload;
    setLmFcs(lmFcs);
  };

  const handleDelete = () => {
    const newFcArray: Flashcard[] = JSON.parse(JSON.stringify(fcArray));

    if (fcArray.length > 0) {
      // Push changes to server.
      makeDeleteReq(`/flashcards/id/${fcArray[fcIndex]._id}`);

      newFcArray.splice(fcIndex, 1);
      lmFcs[fcArray[fcIndex].lmId].splice(fcIndex, 1);

      if (fcArray.length === 1) {
        setFcIndex(-1);
      } else {
        // If index is 0, keep it at 0.
        if (fcIndex === 0) {
          setFcIndex(0);
        } else {
          setFcIndex(fcIndex - 1);
        }
      }

      // Push changes locally.
      setFcArray(newFcArray);
      setLmFcs(lmFcs);
    }
  };

  return (
    <div>
      <FcVisibilityDropdown
        fcArray={fcArray}
        setFcArray={setFcArray}
        fcIndex={fcIndex}
        lmFcs={lmFcs}
        setLmFcs={setLmFcs}
      />
      <button form="fcForm" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export { FcToolbar };
