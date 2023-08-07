import { useState } from "react";
import { CourseraPlaybackLm, Lm } from "../../types";
import {
  compareCourseraPlaybackLm,
  getCourseraPlaybackLmPosition,
  makePostReq,
} from "../../utils";

import { LmDropdownItem } from "./LmDropdownItem";
import "./styles/LmCreator.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  url: string;
}

const LmCreator = ({ lmArray, setLmArray, setLmIndex, url }: Props) => {
  // Buffer holds data until create button is clicked.
  const [typeBuffer, setTypeBuffer] = useState("playback");

  const handleSubmit = () => {
    const urlSlugs = url.split("/");
    const courseTitle = urlSlugs[4];
    const videoTitle = urlSlugs.slice(-1)[0];

    const newLm: CourseraPlaybackLm = {
      _id: "",
      platform: "coursera",
      contentType: typeBuffer,
      content: {
        courseTitle: courseTitle,
        videoTitle: videoTitle,
        videoUrl: url,
        startTime: "",
        endTime: "",
        concepts: [],
      },
      visibility: "development",
      flashcards: [],
    };

    // Push changes to server.
    const payload = newLm;
    console.log("payload:", payload);
    makePostReq("/lms", payload)
      .then((res) => {
        newLm._id = res._id;
      })
      .catch((e) => console.log(e));

    const newLmArray: CourseraPlaybackLm[] = JSON.parse(
      JSON.stringify(lmArray)
    );
    newLmArray.push(newLm);
    newLmArray.sort(compareCourseraPlaybackLm);
    setLmArray(newLmArray);
    setLmIndex(getCourseraPlaybackLmPosition(newLmArray, newLm));
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
      <button onClick={handleSubmit}>Create New LM</button>
    </div>
  );
};

export { LmCreator };
