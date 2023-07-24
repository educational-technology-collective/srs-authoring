export interface McqAnswer {
  option: string;
  isCorrect: boolean;
}

export interface Flashcard {
  _id: string;
  lmId: string;
  type: string;
  content: {
    question: string;
    answer: McqAnswer[] | string;
  };
  visibility: string;
  source: string;
}

// export interface VideoLm {
//   _id: string;
//   videoUrl: string;
//   startTime: string;
//   endTime: string;
//   concepts: string[]; // for frontend use
//   flashcards: Flashcard[]; // for frontend use
//   visibility: string;
// }

export interface Lm {
  _id: string;
  platform: string;
  contentType: string;
  content: object;
  visibility: string;
}

export interface CourseraPlaybackLm extends Lm {
  content: {
    videoUrl: string;
    startTime: string;
    endTime: string;
    concepts: string[];
  };
}

export interface VideoLm {
  _id: string;
  type: string;
  content: {
    videoUrl: string;
    startTime: string;
    endTime: string;
    concepts: string[];
  };
  visibility: string;
  flashcards: Flashcard[];
}

export interface LmFcs {
  [key: string]: Flashcard[];
}
