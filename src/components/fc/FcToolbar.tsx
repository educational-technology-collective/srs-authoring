import { FormEvent } from "react";
import { Lm, McqAnswer } from "../../types";
import { getFcPosition, makeDeleteReq, makePutReq } from "../../utils";

import { FcVisibilityDropdown } from ".";
import "./styles/FcToolbar.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcToolbar = ({
  lmArray,
  setLmArray,
  lmIndex,
  fcIndex,
  setFcIndex,
}: Props) => {
  const handleAdd = () => {
    const newLmArray = [...lmArray];
    (
      newLmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]
    ).push({ option: "", isCorrect: false });

    // Push changes locally.
    setLmArray(newLmArray);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Push changes to server.
    const payload = lmArray[lmIndex].flashcards[fcIndex];
    console.log("payload:", payload);
    makePutReq("/flashcards", payload);

    // Push changes locally.
    setLmArray(lmArray);
    setFcIndex(getFcPosition(lmArray[lmIndex].flashcards, payload));
  };

  const handleDelete = () => {
    const newLmArray = [...lmArray];

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
    <div id="fcToolbarContainer">
      <FcVisibilityDropdown
        lmArray={lmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
      />
      {lmArray[lmIndex].flashcards[fcIndex].type === "mcq" && (
        <button onClick={handleAdd}>Add Choice</button>
      )}
      <button onClick={handleSubmit}>Save Changes</button>
      <button onClick={handleDelete}>Delete Flashcard</button>
    </div>
  );
};

export { FcToolbar };
