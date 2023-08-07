import { CourseraPlaybackLm, Lm } from "../../types";
import { makePutReq } from "../../utils";

import { LmDropdownItem } from ".";
import "./styles/LmVisibilityDropdown.css";

interface Props {
  lmArray: Lm[];
  setLmArray: React.Dispatch<React.SetStateAction<Lm[]>>;
  lmIndex: number;
}

const LmVisibilityDropdown = ({ lmArray, setLmArray, lmIndex }: Props) => {
  const handleChange = () => {
    if (lmArray.length > 0) {
      const e = document.getElementById("lmSelectMenu") as HTMLSelectElement;
      const newLmArray: CourseraPlaybackLm[] = [
        ...(lmArray as CourseraPlaybackLm[]),
      ];
      newLmArray[lmIndex].visibility = e.value;
      setLmArray(newLmArray);

      // Push changes to server.
      const payload = newLmArray[lmIndex];
      console.log("payload:", payload);
      makePutReq("/lms", payload);
    }
  };

  return (
    <div id="lmDropdownContainer">
      <select
        name=""
        id="lmSelectMenu"
        onChange={handleChange}
        value={lmArray.length > 0 ? lmArray[lmIndex].visibility : ""}
      >
        {lmArray.length > 0 && (
          <>
            <LmDropdownItem value={"development"} />;
            <LmDropdownItem value={"review"} />;
            <LmDropdownItem value={"production"} />;
          </>
        )}
      </select>
    </div>
  );
};

export { LmVisibilityDropdown };
