import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "./Textarea.css";
import { capitalize } from "../utils/capitalize";
import { useState } from "react";

type Props = {
  name: string;
  value: string;
  isCode: boolean;
  codeType?: string;
  onChange: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
};

export const Textarea = ({
  isCode,
  name,
  value,
  onChange,
  codeType,
}: Props) => {
  const [code, setCode] = useState("");
  return (
    <label className="textarea-label">
      <div className="label-text">{capitalize(name)}</div>
      {isCode ? (
        <Editor
          className="editor"
          value={value}
          name={name}
          onValueChange={(code) => {
            const syntheticEvent = {
              currentTarget: {
                name,
                value: code,
              },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onChange(syntheticEvent);
            setCode(code);
          }}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages[`${codeType}`], `${codeType}`)
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      ) : (
        <textarea
          className="text-area"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  );
};
