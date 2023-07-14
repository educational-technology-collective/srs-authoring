import { flashCard } from "./from-haytham-new/types";
import Card from "./from-haytham-new/Card";
import "../styles/PreviewPane.css";
import { Flashcard } from "../types";

interface Props {
  flashcard: Flashcard;
  flashcards: Flashcard[];
}

const PreviewPane = ({ flashcard, flashcards }: Props) => {
  // convert from one interface to another
  let flashcard2: flashCard = {
    _id: "",
    lmid: "",
    type: "",
    content: { question: "", answer: {} },
  };

  if (flashcard && flashcards.length > 0) {
    flashcard2._id = flashcard._id;
    flashcard2.lmid = flashcard.lmId;
    flashcard2.type = flashcard.type;
    flashcard2.content = flashcard.content;
  }

  // console.log("previewing:", flashcard2);

  return <>{flashcard && flashcard2 && <Card obj={flashcard2} isEmpty={flashcards.length > 0 ? false : true} />}</>;
};

export { PreviewPane };
