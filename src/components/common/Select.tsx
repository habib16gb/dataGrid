import { Dispatch, ReactNode, SetStateAction, useState,useEffect } from "react";

interface Prop {
  children?: ReactNode;
  selectedOption: string;
  setOptionsRest: Dispatch<SetStateAction<string[]>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  options: string[];
  fieldsSelected?: {
    first: string;
    second: string;
    third: string;
  }
}

const Select = ({ selectedOption, setSelectedOption, options }: Prop) => {
  
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
    
  }
  return (
    <select
      value={selectedOption}
      onChange={handleChange}
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
