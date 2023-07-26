import { LmSelector } from ".";
import "./styles/LmNavbar.css";

interface Props {
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  numLms: number;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LmNavbar = ({ lmIndex, setLmIndex, numLms, setFcIndex }: Props) => {
  return (
    <div id="lmNavbarContainer">
      <p id="lmHeader">Learning Moments:</p>
      <div id="lmNavbarSpacer"></div>
      <LmSelector
        lmIndex={lmIndex}
        setLmIndex={setLmIndex}
        numLms={numLms}
        setFcIndex={setFcIndex}
      />
    </div>
  );
};

export { LmNavbar };
