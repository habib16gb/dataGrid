import { useContext, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { DataContext } from "../AdvancedDataGridv2Page";
import { enOperator } from "../enums";

const textOptions = [
  enOperator.CONTAINS,
  enOperator.START_WITH,
  enOperator.END_WITH,
  enOperator.EQUALS,
];

const numberOptions = [
  enOperator.EQUALS_NUMBER,
  enOperator.LESS_THAN,
  enOperator.LESS_THAN_AND_EQUAL,
  enOperator.GREATER_THAN,
  enOperator.GREATER_THAN_AND_EQUAL,
  enOperator.NOT_EQUAL,
];

const DataGridFilter = () => {
  const context = useContext(DataContext);
  const { columns } = context;
  const [fieldSelected, setFieldSelected] = useState("");
  const [operatorSelected, setOperatorSelected] = useState("");
  const [listOptions, setListOptions] = useState<enOperator[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldSelected(e.target.value);
  };

  const loadList = () => {
    const element = columns.find((col) => col.field === fieldSelected);
    element?.type === "text"
      ? setListOptions(textOptions)
      : setListOptions(numberOptions);
  };

  useEffect(() => {
    loadList();
  }, [fieldSelected]);

  const handleOperatorSelected = () => {
    console.log("select", operatorSelected);
  };

  return (
    <div className='p-4 shadow-md mb-2'>
      <FaFilter className='cursor-pointer hover:text-green-700' />
      <select onChange={handleSelect} value={fieldSelected}>
        {columns.map(({ field }, index) => (
          <option key={index}>{field}</option>
        ))}
      </select>
      <select onChange={handleOperatorSelected} value={operatorSelected}>
        {listOptions.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DataGridFilter;
