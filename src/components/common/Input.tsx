import { ChangeEvent } from "react";

interface Props {
  value: string | number | readonly string[];
  type: string;
  width: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, type, onChange, width }: Props) => {
  return (
    <input
      style={{ width }}
      defaultValue={value || ""}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
