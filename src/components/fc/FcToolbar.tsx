import { FormEvent } from "react";
import { Lm } from "../../types";
import { getFcPosition, makeDeleteReq, makePutReq } from "../../utils";

import { FcVisibilityDropdown } from ".";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  qBuffer: string;
  aBuffer: string;
}

const FcToolbar = ({
  lmArray,
  setLmArray,
  lmIndex,
  fcIndex,
  setFcIndex,
  qBuffer,
  aBuffer,
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    newLmArray[lmIndex].flashcards[fcIndex].content.question = qBuffer;
    if (lmArray[lmIndex].flashcards[fcIndex].type === "mcq") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer =
        JSON.parse(aBuffer);
    } else if (lmArray[lmIndex].flashcards[fcIndex].type === "qa") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer = aBuffer;
    }

    // Push changes to server.
    const payload = newLmArray[lmIndex].flashcards[fcIndex];
    console.log("payload:", payload);
    makePutReq("/flashcards", payload);

    // Push changes locally.
    setLmArray(newLmArray);
    setFcIndex(getFcPosition(newLmArray[lmIndex].flashcards, payload));
  };

  const handleDelete = () => {
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    if (lmArray[lmIndex].flashcards.length > 0) {
      // Push changes to server.
      makeDeleteReq(
        `/flashcards/id/${lmArray[lmIndex].flashcards[fcIndex]._id}`
      );

      newLmArray[lmIndex].flashcards.splice(fcIndex, 1);

      if (lmArray[lmIndex].flashcards.length === 1) {
        setFcIndex(0);
      } else {
        // If index is 0, keep it at 0.
        if (fcIndex === 0) {
          setFcIndex(0);
        } else {
          setFcIndex(fcIndex - 1);
        }
      }

      // Push changes locally.
      setLmArray(newLmArray);
    }
  };

  return (
    <div>
      <FcVisibilityDropdown
        lmArray={lmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
      />
      <button form="fcForm" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export { FcToolbar };
