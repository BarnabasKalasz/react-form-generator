import FormState from "../models/FormState.model";

export const formatQuestions = (questions: string[]): FormState[] => {
  return questions.map((question) => ({
    question,
    answer: "",
    codeSnippet: "",
    level: "all levels",
    isJsSnippet: false,
    isHtmlSnippet: false,
    isCssSnippet: false,
    questionType: "other",
  }));
};
