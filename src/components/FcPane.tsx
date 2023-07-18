import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { VideoLm, Flashcard } from "../types";
import { makePostReq, makePutReq, makeDeleteReq } from "../utils";
import { CardDisplay, CardAdd, CardEdit, FcDropdown, PreviewPane } from ".";
import "../styles/FcPane.css";

interface Props {
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
  loaded: boolean;
}

const FcPane = ({ lmArray, lmIndex, updateArr, loaded }: Props) => {
  const [fcIndex, setFcIndex] = useState(-1);

  useEffect(() => {
    if (lmIndex >= 0 && lmArray[lmIndex].flashcards.length > 0 && fcIndex === -1) {
      setFcIndex(0);
    }
  }, [lmArray, lmIndex]);

  const [mode, setMode] = useState("display");
  const [q2Add, setQ2Add] = useState("m");

  const handlePrev = () => {
    if (lmArray[lmIndex].flashcards.length === 0) {
      return;
    }

    if (fcIndex === 0) {
      setFcIndex(lmArray[lmIndex].flashcards.length - 1);
    } else {
      setFcIndex((fcIndex - 1) % lmArray[lmIndex].flashcards.length);
    }
  };

  const handleNext = () => {
    if (lmArray[lmIndex].flashcards.length === 0) {
      return;
    }
    setFcIndex((fcIndex + 1) % lmArray[lmIndex].flashcards.length);
  };

  // temporary buffer to store add and edit information.
  const [qBuffer, setQBuffer] = useState("");
  const [mcqAnsBuffer, setMcqAnsBuffer] = useState("");
  const [qaAnsBuffer, setQaAnsBuffer] = useState("");

  const handleAddSelect = () => {
    setMode("addSelect");
  };

  const handleAddMcq = () => {
    setQ2Add("m");
    setMode("add");
  };

  const handleAddQa = () => {
    setQ2Add("q");
    setMode("add");
  };

  const handleEdit = () => {
    if (lmArray[lmIndex].flashcards.length === 0) {
      return;
    }
    setMode("edit");
  };

  const handleDelete = () => {
    if (lmArray[lmIndex].flashcards.length === 0) {
      return;
    }

    // create a new flashcard array without the flashcard that we deleted.
    // then apply those changes to a new LM array.
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    const newFlashcards: Flashcard[] = JSON.parse(JSON.stringify(lmArray[lmIndex].flashcards));
    if (fcIndex >= 0) {
      // push changes to server
      makeDeleteReq(`/flashcards/id/${lmArray[lmIndex].flashcards[fcIndex]._id}`);

      newFlashcards.splice(fcIndex, 1);
      // setFlashcards(newFlashcards);
      newLmArray[lmIndex].flashcards = JSON.parse(JSON.stringify(newFlashcards));
      updateArr(newLmArray);
    }

    if (lmArray[lmIndex].flashcards.length === 1) {
      setFcIndex(-1);
    } else {
      if (fcIndex === 0) {
        setFcIndex(0);
      } else {
        setFcIndex(fcIndex - 1);
      }
    }

    setMode("display");
  };

  const handleCancel = () => {
    setQBuffer("");
    setMcqAnsBuffer("");
    setQaAnsBuffer("");
    setMode("display");
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update lmArray object.
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));

    newLmArray[lmIndex].flashcards[fcIndex].content.question = qBuffer;
    if (lmArray[lmIndex].flashcards[fcIndex].type === "m") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer = JSON.parse(mcqAnsBuffer);
    } else if (lmArray[lmIndex].flashcards[fcIndex].type === "q") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer = qaAnsBuffer;
    }

    updateArr(newLmArray);

    // push changes to server
    const payload = newLmArray[lmIndex].flashcards[fcIndex];
    console.log("payload:", payload);
    makePutReq("/flashcards", payload);

    setMode("display");
    console.log("edit submit");
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update lmArray object.
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));

    // build new flashcards.
    const newMcqFc: Flashcard = {
      _id: "",
      lmId: lmArray[lmIndex]._id,
      type: q2Add,
      content: { question: qBuffer, answer: [] },
      visibility: "Development",
    };

    const newQaFc: Flashcard = {
      _id: "",
      lmId: lmArray[lmIndex]._id,
      type: q2Add,
      content: { question: qBuffer, answer: "" },
      visibility: "Development",
    };

    if (q2Add === "m") {
      newMcqFc.content.answer = JSON.parse(mcqAnsBuffer);

      // push changes to server.
      const payload = newMcqFc;
      console.log("payload:", payload);
      makePostReq("/flashcards", payload)
        .then((res) => {
          newMcqFc._id = res._id;
        })
        .catch((e) => console.log(e));

      newLmArray[lmIndex].flashcards.push(newMcqFc);
      updateArr(newLmArray);
      setFcIndex(newLmArray[lmIndex].flashcards.length - 1);
    } else if (q2Add === "q") {
      newQaFc.content.answer = qaAnsBuffer;

      // push changes to server.
      const payload = newQaFc;
      console.log("payload:", payload);
      makePostReq("/flashcards", payload)
        .then((res) => {
          newQaFc._id = res._id;
        })
        .catch((e) => console.log(e));

      newLmArray[lmIndex].flashcards.push(newQaFc);
      updateArr(newLmArray);
      setFcIndex(newLmArray[lmIndex].flashcards.length - 1);
    }
    setMode("display");
    console.log("add submit");
  };

  return (
    <>
      <div id="fcPaneContainer">
        <div id="fcPaneNavbar">
          <p id="flashcardHeader">Flashcard:</p>
          <div className="navbarSpacer"></div>
          <div id="cardBtnContainer">
            <button id="prevCardBtn" onClick={handlePrev}>
              &lt;
            </button>
            <span id="fcCounter">
              {lmIndex >= 0 && lmArray[lmIndex].flashcards.length > 0 ? fcIndex + 1 : 0} /{" "}
              {lmIndex >= 0 ? lmArray[lmIndex].flashcards.length : 0}
            </span>
            {/* <span id="fcCounter">{fcIndex + 1 / lmArray[lmIndex].flashcards.length}</span> */}
            <button id="nextCardBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        <div id="fcPaneFcContainer">
          {lmIndex >= 0 && mode === "display" && <CardDisplay card={lmArray[lmIndex].flashcards[fcIndex]} />}
          {lmIndex >= 0 && mode === "add" && (
            <CardAdd
              handleAddSubmit={handleAddSubmit}
              q2Add={q2Add}
              qBuffer={qBuffer}
              mcqAnsBuffer={mcqAnsBuffer}
              qaAnsBuffer={qaAnsBuffer}
              setQBuffer={setQBuffer}
              setMcqAnsBuffer={setMcqAnsBuffer}
              setQaAnsBuffer={setQaAnsBuffer}
            />
          )}
          {lmIndex >= 0 && mode === "edit" && (
            <CardEdit
              card={lmArray[lmIndex].flashcards[fcIndex]}
              handleEditSubmit={handleEditSubmit}
              qBuffer={qBuffer}
              mcqAnsBuffer={mcqAnsBuffer}
              qaAnsBuffer={qaAnsBuffer}
              setQBuffer={setQBuffer}
              setMcqAnsBuffer={setMcqAnsBuffer}
              setQaAnsBuffer={setQaAnsBuffer}
            />
          )}
        </div>
        <div id="fcPaneBottomBarContainer">
          <div id="fcPaneVisibilityMenuContainer">
            {mode === "display" && (
              <FcDropdown lmArray={lmArray} updateArr={updateArr} lmIndex={lmIndex} fcIndex={fcIndex} />
            )}
          </div>
          <div id="fcPaneBtnContainer">
            {mode === "display" && (
              <>
                <button onClick={handleAddSelect}>Add</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
            {(mode === "edit" || mode === "add" || mode === "addSelect") && (
              <>
                {mode === "addSelect" && (
                  <>
                    <button onClick={handleAddMcq}>MCQ</button>
                    <button onClick={handleAddQa}>QA</button>
                  </>
                )}
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
        <div id="previewPane">
          {/* {lmIndex >= 0 && flashcards.length >= 0 && fcIndex >= 0 && <PreviewPane flashcard={flashcards[fcIndex]} />} */}
          {lmIndex >= 0 &&
            lmArray[lmIndex].flashcards.length >= 0 &&
            fcIndex >= 0 &&
            loaded &&
            createPortal(
              <PreviewPane flashcard={lmArray[lmIndex].flashcards[fcIndex]} flashcards={lmArray[lmIndex].flashcards} />,
              document.getElementById("rightPreview") as HTMLElement
            )}
          {/* {lmIndex >= 0 &&
            flashcards.length >= 0 &&
            fcIndex >= 0 &&
            createPortal(
              <PreviewPane flashcard={flashcards[fcIndex]} />,
              document.getElementById("myDiv") as HTMLElement
            )} */}
          {/* <button onClick={handlePreview}>Open Preview</button> */}
        </div>
      </div>
    </>
  );
};

export { FcPane };
