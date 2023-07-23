import { LmSelector } from ".";
import "./styles/LmNavbar.css";

interface Props {
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  numLms: number;
}

const LmNavbar = ({ lmIndex, setLmIndex, numLms }: Props) => {
  return (
    <div id="lmNavbarContainer">
      <p id="lmHeader">Learning Moments:</p>
      <div id="lmNavbarSpacer"></div>
      <LmSelector lmIndex={lmIndex} setLmIndex={setLmIndex} numLms={numLms} />
    </div>
  );
};

export { LmNavbar };
