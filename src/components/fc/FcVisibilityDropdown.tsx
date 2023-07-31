import { Flashcard, Lm } from "../../types";
import { makePutReq } from "../../utils";

import { FcDropdownItem } from ".";
import "./styles/FcVisibilityDropdown.css";

interface Props {
  lmArray: Lm[];
  lmIndex: number;
  fcIndex: number;
}

const FcVisibilityDropdown = ({ lmArray, lmIndex, fcIndex }: Props) => {
  const handleChange = () => {
    if (lmArray[lmIndex].flashcards.length > 0) {
      const e = document.getElementById("fcSelectMenu") as HTMLSelectElement;
      const newFcArray: Flashcard[] = JSON.parse(
        JSON.stringify(lmArray[lmIndex].flashcards)
      );
      newFcArray[fcIndex].visibility = e.value;

      // Push changes to server.
      const payload = newFcArray[fcIndex];
      console.log("payload:", payload);
      makePutReq("/flashcards", payload);
    }
  };

  return (
    <div id="fcDropdownContainer">
      <select
        name=""
        id="fcSelectMenu"
        onChange={handleChange}
        value={
          lmArray[lmIndex].flashcards.length > 0
            ? lmArray[lmIndex].flashcards[fcIndex].visibility
            : ""
        }
      >
        {lmArray[lmIndex].flashcards.length > 0 && (
          <>
            <FcDropdownItem value={"development"} />;
            <FcDropdownItem value={"review"} />;
            <FcDropdownItem value={"production"} />;
          </>
        )}
      </select>
    </div>
  );
};

export { FcVisibilityDropdown };
