export interface McqAnswer {
  option: string;
  isCorrect: boolean;
}

export interface Flashcard {
  _id: string;
  lm_id: string;
  type: string;
  content: {
    question: string;
    answer: McqAnswer[] | string;
  };
  visibility: string;
  source: string;
}

export interface Lm {
  _id: string;
  platform: string;
  contentType: string;
  content: object;
  visibility: string;
  flashcards: Flashcard[];
}

export interface CourseraPlaybackLm extends Lm {
  content: {
    courseTitle: string;
    videoTitle: string;
    videoUrl: string;
    startTime: string;
    endTime: string;
    concepts: string[];
  };
}

export interface LmFcs {
  [key: string]: Flashcard[];
}
