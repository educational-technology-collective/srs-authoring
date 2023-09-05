import { FcDropdownItem } from ".";
import "./styles/FcMcqChoice.css";

interface Props {
  option: string;
  handleOptionUpdate: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    mcqIndex: number
  ) => void;
  isCorrect: boolean;
  handleIsCorrectUpdate: (
    e: React.ChangeEvent<HTMLSelectElement>,
    mcqIndex: number
  ) => void;
  handleDelete: (mcqIndex: number) => void;
  mcqIndex: number;
}

const FcMcqChoice = ({
  option,
  handleOptionUpdate,
  isCorrect,
  handleIsCorrectUpdate,
  handleDelete,
  mcqIndex,
}: Props) => {
  return (
    <div id="fcMcqChoiceContainer">
      <textarea
        id="fcMcqOption"
        rows={2}
        value={option}
        placeholder="Your answer here..."
        onChange={(e) => handleOptionUpdate(e, mcqIndex)}
      />
      <div id="fcMcqChoiceBottomBarContainer">
        <select
          name=""
          id="fcTypeMenu"
          value={isCorrect.toString()}
          onChange={(e) => handleIsCorrectUpdate(e, mcqIndex)}
        >
          <FcDropdownItem value={"true"} />;
          <FcDropdownItem value={"false"} />;
        </select>
        <button id="fcMcqChoiceDelBtn" onClick={() => handleDelete(mcqIndex)}>
          X
        </button>
      </div>
    </div>
  );
};

export { FcMcqChoice };
