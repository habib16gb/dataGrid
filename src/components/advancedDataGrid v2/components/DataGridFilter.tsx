import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../AdvancedDataGridv2Page";
import { enOperator } from "../enums";
import DataGridSelect from "./DataGridSelect";
import { tyRow } from "../types";

interface Props {
  data: tyRow[];
}

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

const filtersFunctions = [
  {
    operator: enOperator.CONTAINS,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele: tyRow) =>
        ele[field as keyof typeof ele]
          ?.toLocaleLowerCase()
          ?.includes(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.EQUALS_NUMBER,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] == value
          ),
  },
  {
    operator: enOperator.NOT_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] != +value
          ),
  },
  {
    operator: enOperator.GREATER_THAN,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] > +value
          ),
  },
  {
    operator: enOperator.GREATER_THAN_AND_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] >= +value
          ),
  },
  {
    operator: enOperator.LESS_THAN,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] < +value
          ),
  },
  {
    operator: enOperator.LESS_THAN_AND_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
      value == ""
        ? data
        : [...data].filter(
            (ele: tyRow) => ele[field as keyof typeof ele] <= +value
          ),
  },
  {
    operator: enOperator.EQUALS,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter(
        (ele) =>
          ele[field as keyof typeof ele]?.toLocaleLowerCase() ===
          value?.toLocaleLowerCase()
      ),
  },
  {
    operator: enOperator.START_WITH,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele: tyRow) =>
        ele[field as keyof typeof ele]
          ?.toLocaleLowerCase()
          ?.startsWith(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.END_WITH,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele: tyRow) =>
        ele[field as keyof typeof ele]
          ?.toLocaleLowerCase()
          ?.endsWith(value?.toLocaleLowerCase())
      ),
  },
];

const inputClass =
  "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900";
const labelClass =
  "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900";

const DataGridFilter = ({ data }: Props) => {
  const context = useContext(DataContext);
  const { columns, setDataFiltered, setRows } = context;
  const [fieldSelected, setFieldSelected] = useState("");
  const [operatorSelected, setOperatorSelected] = useState("");
  const [listOptions, setListOptions] = useState<enOperator[]>([]);
  const [listFields, setListFields] = useState<string[]>([]);

  const filterValueRef = useRef(null);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldSelected(e.target.value);
  };

  const handleSelectOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperatorSelected(e.target.value);
  };

  const handleFilter = () => {
    const ele = filtersFunctions.find((fn) => fn.operator === operatorSelected);
    setDataFiltered(
      ele?.fn(data, fieldSelected, filterValueRef.current?.value)
    );
  };

  const loadList = () => {
    const element = columns.find((col) => col.field === fieldSelected);
    element?.type === "text"
      ? setListOptions(textOptions)
      : setListOptions(numberOptions);
  };

  useEffect(() => {
    setListFields(columns.map(({ field }) => field));
  }, [columns]);

  useEffect(() => {
    loadList();
  }, [fieldSelected]);

  return (
    <div className='flex  items-center gap-2'>
      <div className='flex items-center gap-1'>
        <DataGridSelect
          onChange={handleSelect}
          value={fieldSelected}
          label='select field to filter'
          options={listFields}
        />
        <DataGridSelect
          onChange={handleSelectOperator}
          value={operatorSelected}
          label='select operator'
          options={listOptions}
        />
      </div>
      {fieldSelected && operatorSelected && (
        <div className='relative w-full min-w-[200px] h-10'>
          <input
            className={inputClass}
            ref={filterValueRef}
            onChange={handleFilter}
          />
          <label className={labelClass}>Filter Value</label>
        </div>
      )}
    </div>
  );
};

export default DataGridFilter;
