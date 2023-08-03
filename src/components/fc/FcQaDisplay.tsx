import React from "react";
import { Lm } from "../../types";

import { FcToolbar } from ".";
import "./styles/FcQaDisplay.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcQaDisplay = ({
  lmArray,
  setLmArray,
  lmIndex,
  fcIndex,
  setFcIndex,
}: Props) => {
  const handleQUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newLmArray = [...lmArray];
    newLmArray[lmIndex].flashcards[fcIndex].content.question = e.target.value;
    setLmArray(newLmArray);
  };

  const handleAnsUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newLmArray = [...lmArray];
    newLmArray[lmIndex].flashcards[fcIndex].content.answer = e.target.value;
    setLmArray(newLmArray);
  };

  const handleSrcUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newLmArray = [...lmArray];
    newLmArray[lmIndex].flashcards[fcIndex].source = e.target.value;
    setLmArray(newLmArray);
  };

  return (
    <div id="fcQaDisplayContainer">
      <textarea
        id="fcQaQuestions"
        rows={8}
        name="question"
        onChange={(e) => handleQUpdate(e)}
      />
      <textarea
        id="fcQaAnswers"
        rows={13}
        name="answers"
        onChange={(e) => handleAnsUpdate(e)}
      />
      <textarea
        id="fcQaSource"
        rows={1}
        name="source"
        onChange={(e) => handleSrcUpdate(e)}
      />
      <FcToolbar
        lmArray={lmArray}
        setLmArray={setLmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
        setFcIndex={setFcIndex}
      />
    </div>
  );
};

export { FcQaDisplay };
