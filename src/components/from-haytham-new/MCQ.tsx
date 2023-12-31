import Choices from "./Choices";
import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { flashCard, individualChoice } from "./types";
import rehypeRaw from "rehype-raw";

const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  // setClickStatus: () => void;
  // handleTestEvaluation: (result: string) => void;
}> = ({ obj, clicked }) => {
  const question: string = obj.content.question;
  const choice: individualChoice[] = obj.content.answer;

  // let frontQuestionStyle: string, backQuestionStyle: string;

  // frontQuestionStyle = "front-text mcq-question card-text";
  // backQuestionStyle = "card-text  back-text mcq-question";

  const frontQuestionStyle = "front-text mcq-question card-text";
  const backQuestionStyle = "card-text  back-text mcq-question";

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className={frontQuestionStyle}
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Question Text Back */}
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className={backQuestionStyle}
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Component for all the choices */}
      <Choices
        answer={choice}
        // setClickStatus={setClickStatus}
        clicked={clicked}
        // handleTestEvaluation={handleTestEvaluation}
      />
    </>
  );
};

export default MCQ;
