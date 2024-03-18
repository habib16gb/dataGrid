import { Dispatch, ReactNode, SetStateAction } from "react";

interface Prop {
  children?: ReactNode;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  options: string[];
}

const Select = ({ selectedOption, setSelectedOption, options }: Prop) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className='shadow px-4 py-2 rounded-md'
    >
      {/* <option defaultValue={"choose one"}>Choose one</option> */}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
