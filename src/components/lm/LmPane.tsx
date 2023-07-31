import React from "react";
import { Lm } from "../../types";

import { LmNavbar, LmCourseraPlaybackDisplay, LmCreator } from ".";
import "./styles/LmPane.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  setFcIndex: React.Dispatch<React.SetStateAction<number>>;
  url: string;
}

const LmPane = ({
  lmArray,
  setLmArray,
  lmIndex,
  setLmIndex,
  setFcIndex,
  url,
}: Props) => {
  return (
    <div id="lmPaneContainer">
      <LmNavbar
        lmIndex={lmIndex}
        setLmIndex={setLmIndex}
        numLms={lmArray.length}
        setFcIndex={setFcIndex}
      />
      {lmArray.length > 0 &&
        lmArray[lmIndex].platform === "coursera" &&
        lmArray[lmIndex].contentType === "playback" && (
          <LmCourseraPlaybackDisplay
            lmArray={lmArray}
            setLmArray={setLmArray}
            lmIndex={lmIndex}
            setLmIndex={setLmIndex}
            setFcIndex={setFcIndex}
          />
        )}
      <LmCreator
        lmArray={lmArray}
        setLmArray={setLmArray}
        setLmIndex={setLmIndex}
        url={url}
      />
    </div>
  );
};

export { LmPane };
