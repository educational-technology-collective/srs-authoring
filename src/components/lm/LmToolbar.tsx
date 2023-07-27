import { FormEvent } from "react";
import { CourseraPlaybackLm, Lm } from "../../types";
import {
  compareCourseraPlaybackLm,
  getCourseraPlaybackLmPosition,
  makeDeleteReq,
  makePutReq,
} from "../../utils";

import { LmVisibilityDropdown } from ".";
import "./styles/LmToolbar.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
  startTimeBuffer: string;
  endTimeBuffer: string;
  conceptsBuffer: string;
}

const LmToolbar = ({
  lmArray,
  setLmArray,
  lmIndex,
  setLmIndex,
  startTimeBuffer,
  endTimeBuffer,
  conceptsBuffer,
}: Props) => {
  console.log(startTimeBuffer, endTimeBuffer, conceptsBuffer);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newLmArray: CourseraPlaybackLm[] = JSON.parse(
      JSON.stringify(lmArray)
    );

    newLmArray[lmIndex].content.startTime = startTimeBuffer;
    newLmArray[lmIndex].content.endTime = endTimeBuffer;
    newLmArray[lmIndex].content.concepts = conceptsBuffer.split(", ");

    // Push changes to server.
    const payload = newLmArray[lmIndex];
    console.log("payload:", payload);
    makePutReq("/lms", payload);

    console.log("newLmArray", newLmArray);

    // Push changes locally.
    newLmArray.sort(compareCourseraPlaybackLm);
    setLmArray(newLmArray);
    setLmIndex(getCourseraPlaybackLmPosition(newLmArray, payload));
  };

  const handleDelete = () => {
    // Create a new LM array without the LM that we deleted.
    // Then set that as the most recent array.
    const newLmArray: CourseraPlaybackLm[] = JSON.parse(
      JSON.stringify(lmArray)
    );

    if (lmArray.length > 0) {
      // Push changes to server.
      makeDeleteReq(`/lms/id/${lmArray[lmIndex]._id}`);

      newLmArray.splice(lmIndex, 1);

      if (lmArray.length === 1) {
        setLmIndex(0);
      } else {
        // If index is 0, keep it at 0.
        if (lmIndex === 0) {
          setLmIndex(0);
        } else {
          setLmIndex(lmIndex - 1);
        }
      }

      setLmArray(newLmArray);
    }
  };

  return (
    <div id="lmToolbarContainer">
      <LmVisibilityDropdown
        lmArray={lmArray}
        setLmArray={setLmArray}
        lmIndex={lmIndex}
      />
      <button form="lmForm" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export { LmToolbar };
