import React from "react";
import { Lm, McqAnswer } from "../../types";

import { FcMcqChoice, FcToolbar } from ".";
import "./styles/FcMcqDisplay.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FcMcqDisplay = ({
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

  const handleOptionUpdate = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    mcqIndex: number
  ) => {
    let newLmArray = [...lmArray];
    (newLmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]).map(
      (ma, idx) => {
        if (idx === mcqIndex) {
          ma.option = e.target.value;
        }
        return ma;
      }
    );

    setLmArray(newLmArray);
  };

  const handleIsCorrectUpdate = (
    e: React.ChangeEvent<HTMLSelectElement>,
    mcqIndex: number
  ) => {
    let newLmArray = [...lmArray];
    (newLmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]).map(
      (ma, idx) => {
        if (idx === mcqIndex) {
          ma.isCorrect = e.target.value === "true";
        }
        return ma;
      }
    );

    setLmArray(newLmArray);
  };

  const handleDelete = (mcqIndex: number) => {
    let newLmArray = [...lmArray];
    (
      newLmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]
    ).splice(mcqIndex, 1);
    setLmArray(newLmArray);
  };

  return (
    <div id="fcMcqDisplayContainer">
      <textarea
        id="fcMcqQuestion"
        rows={6}
        name="question"
        value={lmArray[lmIndex].flashcards[fcIndex].content.question}
        onChange={(e) => handleQUpdate(e)}
      />
      <div id="fcMcqAnsContainer">
        {(
          lmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]
        ).map((ma, idx) => {
          return (
            <FcMcqChoice
              option={ma.option}
              handleOptionUpdate={handleOptionUpdate}
              isCorrect={ma.isCorrect}
              handleIsCorrectUpdate={handleIsCorrectUpdate}
              handleDelete={handleDelete}
              mcqIndex={idx}
            />
          );
        })}
      </div>
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

export { FcMcqDisplay };
