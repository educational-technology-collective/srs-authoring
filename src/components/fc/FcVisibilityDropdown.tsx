import { Flashcard, LmFcs } from "../../types";

import { FcDropdownItem } from ".";
import { makePutReq } from "../../utils";

interface Props {
  fcArray: Flashcard[];
  setFcArray: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  fcIndex: number;
  lmFcs: LmFcs;
  setLmFcs: React.Dispatch<React.SetStateAction<LmFcs>>;
}

const FcVisibilityDropdown = ({
  fcArray,
  setFcArray,
  fcIndex,
  lmFcs,
  setLmFcs,
}: Props) => {
  const handleChange = () => {
    if (fcArray.length > 0) {
      const e = document.getElementById("fcSelectMenu") as HTMLSelectElement;
      const newFcArray: Flashcard[] = JSON.parse(JSON.stringify(fcArray));
      newFcArray[fcIndex].visibility = e.value;
      setFcArray(newFcArray);
      lmFcs[fcArray[fcIndex].lm_id][fcIndex].visibility = e.value;
      setLmFcs(lmFcs);

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
        value={fcArray.length > 0 ? fcArray[fcIndex].visibility : ""}
      >
        {fcArray.length > 0 && (
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
