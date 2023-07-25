import React, { useState } from "react";
import { Flashcard, LmFcs } from "../../types";
import { getFcPosition, makePostReq } from "../../utils";

import { FcDropdownItem } from ".";

interface Props {
  fcArray: Flashcard[];
  setFcArray: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
  lm_id: string;
}

const FcCreator = ({
  fcArray,
  setFcArray,
  setFcIndex,
  lmFcs,
  setLmFcs,
  lm_id,
}: Props) => {
  // Buffer holds data until create button is clicked.
  const [typeBuffer, setTypeBuffer] = useState("m");

  const handleSubmit = () => {
    const newFc: Flashcard = {
      _id: "",
      lm_id: lm_id,
      type: typeBuffer,
      content: {
        question: "",
        answer:
          typeBuffer === "m"
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

    const newFcArray: Flashcard[] = JSON.parse(JSON.stringify(fcArray));
    newFcArray.push(newFc);
    setFcArray(newFcArray);
    setFcIndex(getFcPosition(newFcArray, newFc));
    lmFcs[lm_id].push(newFc);
    setLmFcs(lmFcs);
  };

  return (
    <div id="fcCreatorContainer">
      <select
        name=""
        id="fcTypeMenu"
        onChange={(e) => setTypeBuffer(e.target.value)}
      >
        <FcDropdownItem value={"m"} />;
        <FcDropdownItem value={"q"} />;
      </select>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export { FcCreator };
