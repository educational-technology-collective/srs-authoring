import "./styles/LmSelector.css";

interface Props {
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  numLms: number;
}

const LmSelector = ({ lmIndex, setLmIndex, numLms }: Props) => {
  const handlePrev = () => {
    // Ignore interaction when there are no LMs.
    if (numLms === 0) {
      return;
    }

    if (lmIndex === 0) {
      setLmIndex(numLms - 1);
    } else {
      setLmIndex((lmIndex - 1) % numLms);
    }
  };

  const handleNext = () => {
    // Ignore interaction when there are no LMs.
    if (numLms === 0) {
      return;
    }

    setLmIndex((lmIndex + 1) % numLms);
  };

  return (
    <div id="lmSelectorContainer">
      <button id="prevLmBtn" onClick={handlePrev}>
        &lt;
      </button>
      {numLms === 0 && <span id="lmCounter">0 / 0</span>}
      {numLms > 0 && (
        <span id="lmCounter">
          {lmIndex + 1} / {numLms}
        </span>
      )}
      <button id="nextLmBtn" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export { LmSelector };
