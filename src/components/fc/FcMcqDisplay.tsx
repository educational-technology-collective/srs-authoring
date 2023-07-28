import { useEffect, useState } from "react";
import { Lm, McqAnswer } from "../../types";

import { FcToolbar } from ".";
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
  // Buffer states to hold temporary data.
  const [qBuffer, setQBuffer] = useState(
    lmArray[lmIndex].flashcards[fcIndex].content.question
  );
  const [aBuffer, setABuffer] = useState(
    JSON.stringify(
      lmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[]
    )
  );
  const [srcBuffer, setSrcBuffer] = useState(
    lmArray[lmIndex].flashcards[fcIndex].source
  );

  useEffect(() => {
    if (lmArray[lmIndex].flashcards.length > 0) {
      setQBuffer(lmArray[lmIndex].flashcards[fcIndex].content.question);
      setABuffer(
        JSON.stringify(
          lmArray[lmIndex].flashcards[fcIndex].content.answer as McqAnswer[],
          undefined,
          2
        )
      );
    }
  }, [lmArray[lmIndex].flashcards, fcIndex]);

  return (
    <div id="fcMcqDisplayContainer">
      <form id="fcForm">
        <label className="fcFormLabel" htmlFor="question">
          Q:
        </label>
        <textarea
          id="fcFormQuestions"
          className="fcFormInput"
          rows={8}
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
          rows={13}
          name="answers"
          value={aBuffer}
          onChange={(e) => setABuffer(e.target.value)}
        />
        <label className="fcFormLabel" htmlFor="source">
          S:
        </label>
        <textarea
          id="fcFormSource"
          className="fcFormInput"
          rows={1}
          name="source"
          value={srcBuffer}
          onChange={(e) => setSrcBuffer(e.target.value)}
        />
      </form>
      <FcToolbar
        lmArray={lmArray}
        setLmArray={setLmArray}
        lmIndex={lmIndex}
        fcIndex={fcIndex}
        setFcIndex={setFcIndex}
        qBuffer={qBuffer}
        aBuffer={aBuffer}
        srcBuffer={srcBuffer}
      />
    </div>
  );
};

export { FcMcqDisplay };
