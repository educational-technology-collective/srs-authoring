import { useEffect, useState } from "react";
import { Flashcard, LmFcs, McqAnswer } from "../../types";

import { FcToolbar } from ".";
import "./styles/FcMcqDisplay.css";

interface Props {
  fcArray: Flashcard[];
  setFcArray: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
}

const FcMcqDisplay = ({
  fcArray,
  setFcArray,
  fcIndex,
  setFcIndex,
  lmFcs,
  setLmFcs,
}: Props) => {
  // Buffer states to hold temporary data.
  const [qBuffer, setQBuffer] = useState(fcArray[fcIndex].content.question);
  const [aBuffer, setABuffer] = useState(
    JSON.stringify(fcArray[fcIndex].content.answer as McqAnswer[])
  );

  useEffect(() => {
    if (fcArray.length > 0) {
      setQBuffer(fcArray[fcIndex].content.question);
      setABuffer(
        JSON.stringify(
          fcArray[fcIndex].content.answer as McqAnswer[],
          undefined,
          2
        )
      );
    }
  }, [fcArray, fcIndex]);

  return (
    <div id="fcMcqDisplayContainer">
      <form id="fcForm">
        <label className="fcFormLabel" htmlFor="question">
          Q:
        </label>
        <textarea
          id="fcFormQuestions"
          className="fcFormInput"
          rows={6}
          name="question"
          value={qBuffer}
          onChange={(e) => setQBuffer(e.target.value)}
        />
        <label className="fcFormLabel" htmlFor="answers">
          A:
        </label>
        <textarea
          id="fcFormAnswers"
          className="fcFormInput"
          rows={12}
          name="answers"
          value={aBuffer}
          onChange={(e) => setABuffer(e.target.value)}
        />
      </form>
      <FcToolbar
        fcArray={fcArray}
        setFcArray={setFcArray}
        fcIndex={fcIndex}
        setFcIndex={setFcIndex}
        lmFcs={lmFcs}
        setLmFcs={setLmFcs}
        qBuffer={qBuffer}
        aBuffer={aBuffer}
      />
    </div>
  );
};

export { FcMcqDisplay };
