import { CourseraPlaybackLm, Lm } from "../../types";
import { makePutReq } from "../../utils";

import { FcDropdownItem } from ".";
import "./styles/FcVisibilityDropdown.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
  fcIndex: number;
}

const FcVisibilityDropdown = ({
  lmArray,
  setLmArray,
  lmIndex,
  fcIndex,
}: Props) => {
  const handleChange = () => {
    if (lmArray[lmIndex].flashcards.length > 0) {
      const e = document.getElementById("fcSelectMenu") as HTMLSelectElement;
      const newLmArray: CourseraPlaybackLm[] = [
        ...(lmArray as CourseraPlaybackLm[]),
      ];
      newLmArray[lmIndex].flashcards[fcIndex].visibility = e.value;
      setLmArray(newLmArray);

      // Push changes to server.
      const payload = newLmArray[lmIndex].flashcards[fcIndex];
      console.log("payload:", payload);
      makePutReq("/fcs", payload);
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
