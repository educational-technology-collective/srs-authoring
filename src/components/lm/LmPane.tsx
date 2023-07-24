import { LmNavbar, LmCourseraPlaybackDisplay, LmCreator } from ".";
import "./styles/LmPane.css";

import React from "react";
import { Lm, LmFcs } from "../../types";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
  url: string;
}

const LmPane = ({
  lmArray,
  setLmArray,
  lmIndex,
  setLmIndex,
  lmFcs,
  setLmFcs,
  url,
}: Props) => {
  return (
    <div id="lmPaneContainer">
      <LmNavbar
        lmIndex={lmIndex}
        setLmIndex={setLmIndex}
        numLms={lmArray.length}
      />
      {lmArray.length > 0 &&
        lmArray[lmIndex].platform === "coursera" &&
        lmArray[lmIndex].contentType === "playback" && (
          <LmCourseraPlaybackDisplay
            lmArray={lmArray}
            setLmArray={setLmArray}
            lmIndex={lmIndex}
            setLmIndex={setLmIndex}
            lmFcs={lmFcs}
            setLmFcs={setLmFcs}
          />
        )}
      <LmCreator
        lmArray={lmArray}
        setLmArray={setLmArray}
        setLmIndex={setLmIndex}
        lmFcs={lmFcs}
        setLmFcs={setLmFcs}
        url={url}
      />
    </div>
  );
};

export { LmPane };
