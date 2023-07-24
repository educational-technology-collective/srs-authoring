import { useState } from "react";
import { CourseraPlaybackLm, Lm, LmFcs } from "../../types";
import {
  compareCourseraPlaybackLm,
  getCourseraPlaybackLmPosition,
  makePostReq,
} from "../../utils";

import { LmDropdownItem } from "./LmDropdownItem";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
  url: string;
}

const LmCreator = ({
  lmArray,
  setLmArray,
  setLmIndex,
  lmFcs,
  setLmFcs,
  url,
}: Props) => {
  // Buffer holds data until create button is clicked.
  const [typeBuffer, setTypeBuffer] = useState("playback");

  const handleSubmit = () => {
    const newLm: CourseraPlaybackLm = {
      _id: "",
      platform: "coursera",
      contentType: typeBuffer,
      content: {
        videoUrl: url,
        startTime: "",
        endTime: "",
        concepts: [],
      },
      visibility: "development",
    };

    // Push changes to server.
    const payload = newLm;
    console.log("payload:", payload);
    makePostReq("/lms", payload)
      .then((res) => {
        newLm._id = res._id;
        lmFcs[newLm._id] = [];
      })
      .catch((e) => console.log(e));

    const newLmArray: CourseraPlaybackLm[] = JSON.parse(
      JSON.stringify(lmArray)
    );
    newLmArray.push(newLm);
    newLmArray.sort(compareCourseraPlaybackLm);
    setLmArray(newLmArray);
    setLmIndex(getCourseraPlaybackLmPosition(newLmArray, newLm));
    setLmFcs(lmFcs);
    console.log("LmCreator lmFcs:", lmFcs);
  };

  return (
    <div id="lmCreatorContainer">
      <select
        name=""
        id="lmTypeMenu"
        onChange={(e) => setTypeBuffer(e.target.value)}
      >
        <LmDropdownItem value={"playback"} />;
      </select>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export { LmCreator };
