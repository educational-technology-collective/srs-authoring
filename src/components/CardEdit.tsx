import { useEffect, FormEvent, Dispatch } from "react";
import { Flashcard, McqAnswer } from "../types";
import "../styles/CardEdit.css";

interface Props {
  card: Flashcard;
  handleEditSubmit: (event: FormEvent) => void;
  qBuffer: string;
  mcqAnsBuffer: string;
  qaAnsBuffer: string;
  sourceBuffer: string;
  setQBuffer: Dispatch<React.SetStateAction<string>>;
  setMcqAnsBuffer: Dispatch<React.SetStateAction<string>>;
  setQaAnsBuffer: Dispatch<React.SetStateAction<string>>;
  setSourceBuffer: Dispatch<React.SetStateAction<string>>;
}

const CardEdit = ({
  card,
  handleEditSubmit,
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
    if (card) {
      setQBuffer(card.content.question);
      setMcqAnsBuffer(JSON.stringify(card.content.answer as McqAnswer[], null, 2));
      setQaAnsBuffer(card.content.answer as string);
      setSourceBuffer(card.source);
    }
  }, [setQBuffer, setMcqAnsBuffer, setQaAnsBuffer, card, setSourceBuffer]);

  return (
    <>
      <div id="cardEditContainer">
        <form className="cardForm" onSubmit={handleEditSubmit}>
          <textarea id="cardQInput" value={qBuffer} onChange={(e) => setQBuffer(e.target.value)} />
          {card && card.type === "m" && (
            <textarea id="cardAInput" value={mcqAnsBuffer} onChange={(e) => setMcqAnsBuffer(e.target.value)} />
          )}
          {card && card.type === "q" && (
            <textarea id="cardAInput" value={qaAnsBuffer} onChange={(e) => setQaAnsBuffer(e.target.value)} />
          )}
          {card && (
            <textarea id="cardSourceInput" value={sourceBuffer} onChange={(e) => setSourceBuffer(e.target.value)} />
          )}
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { CardEdit };
