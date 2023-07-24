interface Props {
  fcIndex: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  numFcs: number;
}

const FcSelector = ({ fcIndex, setFcIndex, numFcs }: Props) => {
  const handlePrev = () => {
    // Ignore interaction when there are no LMs.
    if (numFcs === 0) {
      return;
    }

    if (fcIndex === 0) {
      setFcIndex(numFcs - 1);
    } else {
      setFcIndex((fcIndex - 1) % numFcs);
    }
  };

  const handleNext = () => {
    // Ignore interaction when there are no LMs.
    if (numFcs === 0) {
      return;
    }

    setFcIndex((fcIndex + 1) % numFcs);
  };

  return (
    <div id="fcSelectorContainer">
      <button id="prevFcBtn" onClick={handlePrev}>
        &lt;
      </button>
      {numFcs === 0 && <span id="fcCounter">0 / 0</span>}
      {numFcs > 0 && (
        <span id="fcCounter">
          {fcIndex + 1} / {numFcs}
        </span>
      )}
      <button id="nextFcBtn" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export { FcSelector };
