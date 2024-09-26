export default interface FormState {
  question: string;
  answer: string;
  codeSnippet: string;
  level: "all levels" | "junior" | "medior" | "senior";
  isJsSnippet: boolean;
  isHtmlSnippet: boolean;
  isCssSnippet: boolean;
  questionType:
    | "javascript"
    | "html"
    | "typescript"
    | "architecture"
    | "web-components"
    | "testing"
    | "style"
    | "other";
}
