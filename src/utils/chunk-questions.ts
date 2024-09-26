import FormState from "../models/FormState.model";

export const chunkQuestions = (
  questions: FormState[],
  chunkSize: number
): FormState[][] => {
  return questions.reduce((chunkedQuestions: FormState[][], _, index) => {
    index % chunkSize === 0 &&
      chunkedQuestions.push(questions.slice(index, index + chunkSize));
    return chunkedQuestions;
  }, []);
};
