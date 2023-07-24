import { CourseraPlaybackLm, Flashcard } from "../types";

const getCourseraPlaybackLmPosition = (
  cpLmArr: CourseraPlaybackLm[],
  value: CourseraPlaybackLm
) => {
  return cpLmArr.indexOf(value);
};

const getFcPosition = (fcArr: Flashcard[], value: Flashcard) => {
  return fcArr.indexOf(value);
};

const compareCourseraPlaybackLm = (
  lm1: CourseraPlaybackLm,
  lm2: CourseraPlaybackLm
) => {
  // convert time string to time
  const lm1TimeStrs = lm1.content.startTime.split(":");

  let lm1StartTime = 0;
  if (lm1TimeStrs.length === 1) {
    // SS
    lm1StartTime = +lm1TimeStrs[0];
  } else if (lm1TimeStrs.length === 2) {
    // MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 + +lm1TimeStrs[1];
  } else {
    // HH:MM:SS
    lm1StartTime =
      +lm1TimeStrs[0] * 60 * 60 + +lm1TimeStrs[1] * 60 + +lm1TimeStrs[2];
  }

  // convert time string to time
  const lm2TimeStrs = lm2.content.startTime.split(":");

  let lm2StartTime = 0;
  if (lm2TimeStrs.length === 1) {
    // SS
    lm2StartTime = +lm2TimeStrs[0];
  } else if (lm2TimeStrs.length === 2) {
    // MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 + +lm2TimeStrs[1];
  } else {
    // HH:MM:SS
    lm2StartTime =
      +lm2TimeStrs[0] * 60 * 60 + +lm2TimeStrs[1] * 60 + +lm2TimeStrs[2];
  }

  return lm1StartTime - lm2StartTime;
};

const convertConceptsArrayToString = (concepts: string[]) => {
  let conceptTexts = "";
  concepts.forEach((concept, i) => {
    if (i === 0) {
      conceptTexts = concept;
    } else {
      conceptTexts += ", " + concept;
    }
  });

  return conceptTexts;
};

export {
  getCourseraPlaybackLmPosition,
  getFcPosition,
  compareCourseraPlaybackLm,
  convertConceptsArrayToString,
};
