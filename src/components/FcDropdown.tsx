import { DropdownItem } from "./DropdownItem";
import { VideoLm } from "../types";
import { makePutReq } from "../utils";
import "../styles/FcDropdown.css";

interface Props {
  lmArray: VideoLm[];
  updateArr: (value: VideoLm[]) => void;
  lmIndex: number;
  fcIndex: number;
}

// this is a dropdown menu that lists all the captured learning moments.
const FcDropdown = ({ lmArray, updateArr, lmIndex, fcIndex }: Props) => {
  const handleChange = () => {
    if (lmIndex >= 0) {
      const e = document.getElementById("fcSelectMenu") as HTMLSelectElement;
      const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
      newLmArray[lmIndex].flashcards[fcIndex].visibility = e.value;
      updateArr(newLmArray);

      // push changes to server.
      const payload = newLmArray[lmIndex].flashcards[fcIndex];
      console.log("payload:", payload);
      makePutReq("/flashcards", payload);
    }
  };

  return (
    <>
      <div id="dropdown">
        <select
          name=""
          id="fcSelectMenu"
          onChange={handleChange}
          value={
            lmIndex >= 0 && fcIndex >= 0 && lmArray[lmIndex].flashcards.length > 0
              ? lmArray[lmIndex].flashcards[fcIndex].visibility
              : ""
          }
        >
          {fcIndex >= 0 && lmIndex >= 0 && lmArray[lmIndex].flashcards.length > 0 && (
            <>
              <DropdownItem value={"Development"} />;
              <DropdownItem value={"Review"} />;
              <DropdownItem value={"Production"} />;
            </>
          )}
        </select>
      </div>
    </>
  );
};

export { FcDropdown };
