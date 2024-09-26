import { SyntheticEvent } from "react";
import FormState from "../models/FormState.model";
import { Textarea } from "./Textarea";
import { Dropdown } from "./Dropdown";
import { Checkbox } from "./Checkbox";
import "./Form.css";

type Props = {
  formData: FormState[];
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  onChange: (
    event: SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    questionIndex: number
  ) => void;
};

export const Form = ({ onChange, onSubmit, formData }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      {formData.map((item, index) => {
        const snippetCodeType = item.isJsSnippet
          ? "javascript"
          : item.isHtmlSnippet
          ? "html"
          : item.isCssSnippet
          ? "css"
          : "javascript";
        return (
          <div key={index} className="question-block">
            <h3>{item.question}</h3>
            <div className="dropdown-block">
              <Dropdown
                name="level"
                options={["senior", "medior", "junior", "all levels"]}
                value={item.level}
                onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                  onChange(e, index)
                }
              />
              <Dropdown
                name="questionType"
                options={[
                  "javascript",
                  "typescript",
                  "react",
                  "angular",
                  "html",
                  "css",
                  "testing",
                  "architecture",
                  "webcomponent",
                  "other",
                ]}
                value={item.questionType}
                onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                  onChange(e, index)
                }
              />
            </div>
            <Textarea
              value={item.answer}
              name="answer"
              isCode={false}
              onChange={(e: SyntheticEvent<HTMLTextAreaElement>) =>
                onChange(e, index)
              }
            />
            <div className="snippet">
              <div className="snippet-checkboxes">
                <Checkbox
                  name="isJsSnippet"
                  checked={item.isJsSnippet}
                  onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                    onChange(e, index)
                  }
                />
                <Checkbox
                  name="isHtmlSnippet"
                  checked={item.isHtmlSnippet}
                  onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                    onChange(e, index)
                  }
                />
                <Checkbox
                  name="isCssSnippet"
                  checked={item.isCssSnippet}
                  onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                    onChange(e, index)
                  }
                />
              </div>
              <Textarea
                value={item.codeSnippet}
                name="codeSnippet"
                isCode={true}
                codeType={snippetCodeType}
                onChange={(e: SyntheticEvent<HTMLTextAreaElement>) =>
                  onChange(e, index)
                }
              />
            </div>
          </div>
        );
      })}
      <button type="submit">Save to JSON</button>
    </form>
  );
};
