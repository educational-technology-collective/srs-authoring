import { Lm } from "../types";

import { flashCard } from "./from-haytham-new/types";
import Card from "./from-haytham-new/Card";
import "./styles/PreviewPane.css";

interface Props {
  lmArray: Lm[];
  lmIndex: number;
  fcIndex: number;
}

const PreviewPane = ({ lmArray, lmIndex, fcIndex }: Props) => {
  let flashcard: flashCard = {
    _id: "",
    lmid: "",
    type: "",
    content: { question: "", answer: {} },
  };

  const flashcards = lmArray[lmIndex].flashcards;

  if (flashcards && flashcards.length > 0) {
    flashcard._id = flashcards[fcIndex]._id;
    flashcard.lmid = flashcards[fcIndex].lm_id;
    flashcard.type = flashcards[fcIndex].type;
    flashcard.content = flashcards[fcIndex].content;
  }

  return (
    <>
      {flashcards && flashcard && (
        <Card obj={flashcard} isEmpty={flashcards.length > 0 ? false : true} />
      )}
    </>
  );
};

export { PreviewPane };
