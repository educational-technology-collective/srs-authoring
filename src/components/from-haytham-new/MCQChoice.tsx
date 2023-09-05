import { IonButton } from "@ionic/react";
import "./MCQChoice.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

// Incorrect Option Component
export const IncorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  // setClickStatus: () => void;
  // handleTestEvaluation: (result: string) => void;
}> = ({ option, clicked }) => {
  const choiceText: string = option;

  // const [isChosen, setChosen] = useState(false);

  // When the User Clicks Incorrect Option. We will highlight it red
  // and set correct one green
  // const inCorrectClick = () => {
  //   // setClickStatus();
  //   // setChosen(true);
  //   // Set the machine evaluation to be incorrect
  //   // handleTestEvaluation("incorrect");
  // };

  // Style for the button
  const buttonStyle: string = clicked
    ? "choice-button incorrect-button"
    : "choice-button";

  // Component Being Rendered
  return (
    <IonButton className={buttonStyle}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className="choice-text"
        children={choiceText}
      ></ReactMarkdown>
    </IonButton>
  );
};

// Correct Option Component
export const CorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  // setClickStatus: () => void;
  // handleTestEvaluation: (result: string) => void;
}> = ({ option, clicked }) => {
  const choiceText = option;

  // const correctClick = () => {
  //   // setClickStatus();
  //   // Set machine evaluation to be correct
  //   // handleTestEvaluation("correct");
  // };

  // Style for the button
  const buttonStyle: string = clicked
    ? "choice-button correct-button"
    : "choice-button";

  // Component Being Rendered
  return (
    <IonButton className={buttonStyle}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className="choice-text"
        children={choiceText}
      ></ReactMarkdown>
    </IonButton>
  );
};
