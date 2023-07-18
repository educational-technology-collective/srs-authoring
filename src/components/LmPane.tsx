import { useEffect, useState } from "react";
import { VideoLm } from "../types";
import { makePostReq, makePutReq, makeDeleteReq } from "../utils";
import { LmDropdown } from ".";
import "../styles/LmPane.css";

interface Props {
  lmArray: VideoLm[];
  updateArr: (value: VideoLm[]) => void;
  handleIndex: (value: number) => void;
  index: number;
  getLmPosition: (vlmArr: VideoLm[], value: VideoLm) => number;
  url: string;
}

const LmPane = ({ lmArray, updateArr, handleIndex, index, getLmPosition, url }: Props) => {
  // each field of a currently rendered LM is stored as a state.
  const [typeText, setTypeText] = useState("");
  const [startTimeText, setStartTimeText] = useState("");
  const [endTimeText, setEndTimeText] = useState("");
  const [videoUrlText, setVideoUrlText] = useState("");
  const [conceptsText, setConceptsText] = useState("");

  useEffect(() => {
    if (index >= 0) {
      setTypeText(lmArray[index].type);
      setStartTimeText(lmArray[index].content.startTime);
      setEndTimeText(lmArray[index].content.endTime);
      setVideoUrlText(lmArray[index].content.videoUrl);

      lmArray[index].content.concepts.forEach((concept, i) => {
        if (i === 0) {
          setConceptsText(concept);
        } else {
          setConceptsText(conceptsText + ", " + concept);
        }
      });
    } else {
      setTypeText("");
      setStartTimeText("");
      setEndTimeText("");
      setVideoUrlText("");
      setConceptsText("");
    }
  }, [index, lmArray]);

  // temporary text states used for adding and editing LMs.
  const [typeTempText, setTypeTempText] = useState("");
  const [startTimeTempText, setStartTimeTempText] = useState("");
  const [endTimeTempText, setEndTimeTempText] = useState("");
  const [videoUrlTempText, setVideoUrlTempText] = useState("");
  const [conceptsTempText, setConceptsTempText] = useState("");

  // toggle between three modes: display, add, edit.
  const [mode, setMode] = useState("display");

  const handleEdit = () => {
    // pre-populate fields with existing values.
    setTypeTempText(lmArray[index].type);
    setStartTimeTempText(lmArray[index].content.startTime);
    setEndTimeTempText(lmArray[index].content.endTime);
    setVideoUrlTempText(lmArray[index].content.videoUrl);
    let ctt = "";
    lmArray[index].content.concepts.forEach((concept, i) => {
      if (i === 0) {
        ctt = concept;
      } else {
        ctt += ", " + concept;
      }
    });
    setConceptsTempText(ctt);
    setMode("edit");
  };

  const handleAdd = () => {
    // flush the buffer to provide empty fields.
    setTypeTempText("");
    setStartTimeTempText("");
    setEndTimeTempText("");
    setVideoUrlTempText(url);
    setConceptsTempText("");
    setMode("add");
  };

  const handleDelete = () => {
    // create a new LM array without the LM that we deleted.
    // then set that as the most recent array.
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));

    if (index >= 0) {
      // push changes to server
      makeDeleteReq(`/lms/id/${lmArray[index]._id}`);

      newLmArray.splice(index, 1);
      setTypeTempText("");
      setStartTimeText("");
      setEndTimeText("");
      setVideoUrlText("");
      setConceptsText("");

      if (lmArray.length === 1) {
        handleIndex(-1);
      } else {
        // if index is 0, keep it at 0.
        if (index === 0) {
          handleIndex(0);
        } else {
          handleIndex(index - 1);
        }
      }

      updateArr(newLmArray);
    }
  };

  const handleCancel = () => {
    setMode("display");
  };

  const handleSubmit = () => {
    // create a new LM array with the LM we added or edited.
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));

    if (mode === "edit") {
      newLmArray[index].type = typeTempText;
      newLmArray[index].content.startTime = startTimeTempText;
      newLmArray[index].content.endTime = endTimeTempText;
      newLmArray[index].content.videoUrl = videoUrlTempText;
      newLmArray[index].content.concepts = conceptsTempText.split(", ");

      // push changes to server.
      const payload = newLmArray[index];
      console.log("payload:", payload);
      makePutReq("/lms", payload);

      updateArr(newLmArray);
      handleIndex(getLmPosition(newLmArray, payload));
    } else if (mode === "add") {
      const newLm: VideoLm = {
        _id: "",
        type: typeTempText,
        content: {
          startTime: startTimeTempText,
          endTime: endTimeTempText,
          videoUrl: videoUrlTempText,
          concepts: conceptsTempText.split(", "),
        },
        flashcards: [],
        visibility: "Development",
      };

      // push changes to server.
      const payload = newLm;
      console.log("payload:", payload);
      makePostReq("/lms", payload)
        .then((res) => {
          newLm._id = res._id;
        })
        .catch((e) => console.log(e));

      newLmArray.push(newLm);
      updateArr(newLmArray);
      handleIndex(getLmPosition(newLmArray, newLm));
    }

    setMode("display");
  };

  const handlePrev = () => {
    if (lmArray.length === 0) {
      return;
    }
    if (index === 0) {
      handleIndex(lmArray.length - 1);
    } else {
      handleIndex((index - 1) % lmArray.length);
    }
  };

  const handleNext = () => {
    if (lmArray.length === 0) {
      return;
    }
    handleIndex((index + 1) % lmArray.length);
  };

  return (
    <>
      <div id="lmPaneContainer">
        <div id="lmPaneNavbar">
          <p id="lmHeader">Learning Moments:</p>
          <div className="navbarSpacer"></div>
          <div id="lmBtnContainer">
            <button id="prevLmBtn" onClick={handlePrev}>
              &lt;
            </button>
            <span id="lmCounter">
              {index + 1} / {lmArray.length}
            </span>
            <button id="nextLmBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        {mode === "display" && (
          <>
            <div id="lmPaneDisplayContainer">
              <span className="lmLeftCol lmTypeRow">Type:</span>
              <span className="lmRightCol lmTypeRow">{typeText}</span>
              <span className="lmLeftCol lmStartRow">Start:</span>
              <span className="lmRightCol lmStartRow">{startTimeText}</span>
              <span className="lmLeftCol lmEndRow">End:</span>
              <span className="lmRightCol lmEndRow">{endTimeText}</span>
              <span className="lmLeftCol lmUrlRow">URL:</span>
              <span className="lmRightCol lmUrlRow">{videoUrlText}</span>
              <span className="lmLeftCol lmConceptsRow">Concepts:</span>
              <span className="lmRightCol lmConceptsRow">{conceptsText}</span>
            </div>
            <div id="lmPaneBottomBarContainer">
              <div id="lmPaneVisibilityMenuContainer">
                <LmDropdown lmArray={lmArray} updateArr={updateArr} index={index} />
              </div>
              <div className="lmPaneBtnContainer">
                <button id="lmAddBtn" onClick={handleAdd}>
                  Add
                </button>
                <button id="lmEditBtn" onClick={handleEdit}>
                  Edit
                </button>
                <button id="lmDelBtn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
        {mode === "edit" && (
          <>
            <div id="editFormContainer">
              <span className="lmLeftCol lmTypeRow">Type:</span>
              <textarea
                className="lmRightCol lmTypeRow"
                value={typeTempText}
                onChange={(e) => setTypeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmStartRow">Start:</span>
              <textarea
                className="lmRightCol lmStartRow"
                value={startTimeTempText}
                onChange={(e) => setStartTimeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmEndRow">End:</span>
              <textarea
                className="lmRightCol lmEndRow"
                value={endTimeTempText}
                onChange={(e) => setEndTimeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmUrlRow">URL:</span>
              <textarea
                className="lmRightCol lmUrlRow"
                value={videoUrlTempText}
                onChange={(e) => {
                  setVideoUrlTempText(e.target.value);
                }}
              ></textarea>
              <span className="lmLeftCol lmConceptsRow">Concepts:</span>
              <textarea
                className="lmRightCol lmConceptsRow"
                value={conceptsTempText}
                onChange={(e) => {
                  setConceptsTempText(e.target.value);
                }}
              ></textarea>
            </div>
            <div id="lmPaneBottomBarContainer">
              <div id="lmPaneVisibilityMenuContainer"></div>
              <div className="lmPaneBtnContainer">
                <button className="submitBtn" onClick={handleSubmit}>
                  Submit
                </button>
                <button id="lmCancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
        {mode === "add" && (
          <>
            <div id="addFormContainer">
              <span className="lmLeftCol lmTypeRow">Type:</span>
              <textarea
                className="lmRightCol lmTypeRow"
                value={typeTempText}
                onChange={(e) => setTypeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmStartRow">Start:</span>
              <textarea
                className="lmRightCol lmStartRow"
                value={startTimeTempText}
                onChange={(e) => setStartTimeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmEndRow">End:</span>
              <textarea
                className="lmRightCol lmEndRow"
                value={endTimeTempText}
                onChange={(e) => setEndTimeTempText(e.target.value)}
              ></textarea>
              <span className="lmLeftCol lmUrlRow">URL:</span>
              <textarea
                className="lmRightCol lmUrlRow"
                value={videoUrlTempText}
                onChange={(e) => {
                  setVideoUrlTempText(e.target.value);
                }}
              ></textarea>
              <span className="lmLeftCol lmConceptsRow">Concepts:</span>
              <textarea
                className="lmRightCol lmConceptsRow"
                value={conceptsTempText}
                onChange={(e) => {
                  setConceptsTempText(e.target.value);
                }}
              ></textarea>
            </div>
            <div id="lmPaneBottomBarContainer">
              <div id="lmPaneVisibilityMenuContainer"></div>
              <div className="lmPaneBtnContainer">
                <button className="submitBtn" onClick={handleSubmit}>
                  Submit
                </button>
                <button id="lmCancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { LmPane };
