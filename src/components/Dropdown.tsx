import * as React from "react";
import { capitalize } from "../utils/capitalize";
import "./Dropdown.css";

type Props = {
  options: string[];
  placeholder?: string;
  value: string;
  name: string;
  onChange: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
};
export const Dropdown = ({ options, value, name, onChange }: Props) => {
  return (
    <label>
      {capitalize(name)}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </label>
  );
};
