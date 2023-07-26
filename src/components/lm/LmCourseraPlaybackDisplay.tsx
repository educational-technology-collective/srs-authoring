import { useEffect, useState } from "react";
import { CourseraPlaybackLm, Lm } from "../../types";
import { convertConceptsArrayToString } from "../../utils";

import { LmToolbar } from ".";
import "./styles/LmCourseraPlaybackDisplay.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  setLmIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LmCourseraPlaybackDisplay = ({
  lmArray,
  setLmArray,
  lmIndex,
  setLmIndex,
}: Props) => {
  // Cast the general LM to a coursera-playback LM.
  const cpLm: CourseraPlaybackLm = lmArray[lmIndex] as CourseraPlaybackLm;
  console.log("cpLm:", cpLm);

  // Buffer states to hold temporary data.
  const [startTimeBuffer, setStartTimeBuffer] = useState(
    cpLm.content.startTime
  );
  const [endTimeBuffer, setEndTimeBuffer] = useState(cpLm.content.endTime);
  const [conceptsBuffer, setConceptsBuffer] = useState(
    convertConceptsArrayToString(cpLm.content.concepts)
  );

  useEffect(() => {
    if (lmArray.length > 0) {
      setStartTimeBuffer(cpLm.content.startTime);
      setEndTimeBuffer(cpLm.content.endTime);
      setConceptsBuffer(convertConceptsArrayToString(cpLm.content.concepts));
    }
  }, [lmArray, lmIndex]);

  return (
    <div id="lmCPDisplayContainer">
      <form id="lmForm">
        <span className="lmFormLabel">Platform:</span>
        <span className="lmFormInput">{cpLm.platform}</span>
        <span className="lmFormLabel">Type:</span>
        <span className="lmFormInput">{cpLm.contentType}</span>
        <span className="lmFormLabel">Course Title:</span>
        <span className="lmFormInput">{cpLm.content.courseTitle}</span>
        <span className="lmFormLabel">Video Title:</span>
        <span className="lmFormInput">{cpLm.content.videoTitle}</span>
        <span className="lmFormLabel">Video URL:</span>
        <span className="lmFormInput" id="videoUrlSpan">
          {cpLm.content.videoUrl}
        </span>
        <label className="lmFormLabel" htmlFor="startTime">
          Start Time:
        </label>
        <input
          className="lmFormInput"
          type="text"
          name="startTime"
          value={startTimeBuffer}
          onChange={(e) => setStartTimeBuffer(e.target.value)}
        />
        <label className="lmFormLabel" htmlFor="endTime">
          End Time:
        </label>
        <input
          className="lmFormInput"
          type="text"
          name="endTime"
          value={endTimeBuffer}
          onChange={(e) => setEndTimeBuffer(e.target.value)}
        />
        <label className="lmFormLabel" htmlFor="concepts">
          Concepts:
        </label>
        <textarea
          id="lmFormConcepts"
          className="lmFormInput"
          rows={6}
          name="concepts"
          value={conceptsBuffer}
          onChange={(e) => setConceptsBuffer(e.target.value)}
        />
      </form>
      <LmToolbar
        lmArray={lmArray}
        setLmArray={setLmArray}
        lmIndex={lmIndex}
        setLmIndex={setLmIndex}
        startTimeBuffer={startTimeBuffer}
        endTimeBuffer={endTimeBuffer}
        conceptsBuffer={conceptsBuffer}
      />
    </div>
  );
};

export { LmCourseraPlaybackDisplay };
