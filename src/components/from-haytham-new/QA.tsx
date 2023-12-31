import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { flashCard } from "./types";
import rehypeRaw from "rehype-raw";

const QA: React.FC<{ obj: flashCard; clicked: boolean }> = ({
  obj,
  clicked,
}) => {
  const question: string = obj.content.question;

  const answer: string = obj.content.answer;
  // For the font-size
  // let backQuestionStyle: string, answerStyle: string;

  // backQuestionStyle = "card-text back-text qa-question-back ";

  // answerStyle = "card-text back-text qa-answer";

  const backQuestionStyle = "card-text back-text qa-question-back ";
  const answerStyle = "card-text back-text qa-answer";

  // Coponent Being Rendered
  return (
    <>
      {/* Front Question Text */}
      {!clicked && (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className="card-text front-text qa-question"
          children={question}
          remarkPlugins={[remarkGfm]}
        ></ReactMarkdown>
      )}

      {/* Back Question Text */}
      {clicked && (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className={backQuestionStyle}
          children={question}
          remarkPlugins={[remarkGfm]}
        ></ReactMarkdown>
      )}
      {/* Back Answer Text */}
      {clicked && (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className={answerStyle}
          children={answer}
          remarkPlugins={[remarkGfm]}
        ></ReactMarkdown>
      )}
    </>
  );
};

export default QA;
