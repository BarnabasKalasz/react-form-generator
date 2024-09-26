import { capitalize } from "../utils/capitalize";
import "./Checkbox.css";

type Props = {
  checked: boolean;
  name: string;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};
export const Checkbox = ({ name, onChange, checked }: Props) => {
  return (
    <label>
      {capitalize(name)}
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};
