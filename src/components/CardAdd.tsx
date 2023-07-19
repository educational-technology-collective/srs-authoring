import { useEffect, FormEvent, Dispatch } from "react";
import "../styles/CardAdd.css";

interface Props {
  handleAddSubmit: (event: FormEvent) => void;
  q2Add: string;
  qBuffer: string;
  mcqAnsBuffer: string;
  qaAnsBuffer: string;
  sourceBuffer: string;
  setQBuffer: Dispatch<React.SetStateAction<string>>;
  setMcqAnsBuffer: Dispatch<React.SetStateAction<string>>;
  setQaAnsBuffer: Dispatch<React.SetStateAction<string>>;
  setSourceBuffer: Dispatch<React.SetStateAction<string>>;
}

const CardAdd = ({
  handleAddSubmit,
  q2Add,
  qBuffer,
  mcqAnsBuffer,
  qaAnsBuffer,
  sourceBuffer,
  setQBuffer,
  setMcqAnsBuffer,
  setQaAnsBuffer,
  setSourceBuffer,
}: Props) => {
  // initially, buffers will update once mcqAnswers and qaAnswers are loaded.
  useEffect(() => {
    setQBuffer("<Your question here>");
    setMcqAnsBuffer(
      '[\n  {\n    "option": "<your answer here>",\n    "isCorrect": <your boolean here>\n  },\n  {\n    "option": "<your answer here>",\n    "isCorrect": <your boolean here>\n  }\n]'
    );
    setQaAnsBuffer("<Your answer here>");
    setSourceBuffer("<Your source here>");
  }, [setQBuffer, setMcqAnsBuffer, setQaAnsBuffer, setSourceBuffer]);

  return (
    <>
      <div id="cardAddContainer">
        <form className="cardForm" onSubmit={handleAddSubmit}>
          <textarea id="cardQInput" value={qBuffer} onChange={(e) => setQBuffer(e.target.value)} />
          {q2Add === "m" && (
            <textarea id="cardAInput" value={mcqAnsBuffer} onChange={(e) => setMcqAnsBuffer(e.target.value)} />
          )}
          {q2Add === "q" && (
            <textarea id="cardAInput" value={qaAnsBuffer} onChange={(e) => setQaAnsBuffer(e.target.value)} />
          )}
          <textarea id="cardSourceInput" value={sourceBuffer} onChange={(e) => setSourceBuffer(e.target.value)} />
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { CardAdd };
