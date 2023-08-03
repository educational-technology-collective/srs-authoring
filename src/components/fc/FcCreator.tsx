import React, { useState } from "react";
import { Flashcard, Lm } from "../../types";
import { getFcPosition, makePostReq } from "../../utils";

import { FcDropdownItem } from ".";
import "./styles/FcCreator.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcCreator = ({ lmArray, setLmArray, lmIndex, setFcIndex }: Props) => {
  // Buffer holds data until create button is clicked.
  const [typeBuffer, setTypeBuffer] = useState("mcq");

  const handleSubmit = () => {
    const newFc: Flashcard = {
      _id: "",
      lm_id: lmArray[lmIndex]._id,
      type: typeBuffer,
      content: {
        question: "",
        answer:
          typeBuffer === "mcq"
            ? [
                { option: "Your_answer_here", isCorrect: true },
                { option: "Your_answer_here", isCorrect: false },
              ]
            : "",
      },
      visibility: "development",
      source: "",
    };

    // Push changes to server.
    const payload = newFc;
    console.log("payload:", payload);
    makePostReq("/flashcards", payload)
      .then((res) => {
        newFc._id = res._id;
      })
      .catch((e) => console.log(e));

    // Push changes locally.
    const newLmArray = [...lmArray];
    newLmArray[lmIndex].flashcards.push(newFc);
    setLmArray(newLmArray);
    setFcIndex(getFcPosition(newLmArray[lmIndex].flashcards, newFc));
  };

  return (
    <div id="fcCreatorContainer">
      <select
        name=""
        id="fcTypeMenu"
        onChange={(e) => setTypeBuffer(e.target.value)}
      >
        <FcDropdownItem value={"mcq"} />;
        <FcDropdownItem value={"qa"} />;
      </select>
      <button onClick={handleSubmit}>Create New Flashcard</button>
    </div>
  );
};

export { FcCreator };
