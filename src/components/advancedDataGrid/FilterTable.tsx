import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Select from "../common/Select"
import { GridColDef } from "../../pages/AdvancedDataGridPage";
// import rows from "../../data/data";

interface Props {
    columns: GridColDef[];
    data: { id: number; first_name: string; last_name: string; email: string; gender: string; age: number; amount: string; }[]
    setFilterData: Dispatch<SetStateAction<{ id: number; first_name: string; last_name: string; email: string; gender: string; age: number; amount: string; }[]>>
    
}

enum enOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  START_WITH = "start with",
  END_WITH = "end with",
  IS_EMPTY = "is empty",
  IS_NOT_EMPTY = "is not empty",
  EQUALS_NUMBER = "=",
  LESS_THAN = "<",
  LESS_THAN_AND_EQUAL = "<=",
  GREATER_THAN = ">",
  GREATER_THAN_AND_EQUAL = ">=",
  NOT_EQUAL = "!="
}

const filtersFunctions = [
  {
    operator: enOperator.CONTAINS,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele : tyRow) =>
        ele[field as keyof typeof ele]?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.EQUALS_NUMBER,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] == value)
    
  },
  {
    operator: enOperator.NOT_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] != value)
    
  },
  {
    operator: enOperator.GREATER_THAN,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] > +value)
    
  },
  {
    operator: enOperator.GREATER_THAN_AND_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] >= +value)
    
  },
  {
    operator: enOperator.LESS_THAN,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] < +value)
    
  },
  {
    operator: enOperator.LESS_THAN_AND_EQUAL,
    fn: (data: tyRow[], field: string, value: string) =>
    value == "" ? data : [...data].filter((ele : tyRow) =>
    ele[field as keyof typeof ele] <= +value)
    
  },
  {
    operator: enOperator.EQUALS,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter(
        (ele) => ele[field as keyof typeof ele]?.toLocaleLowerCase() === value?.toLocaleLowerCase()
      ),
  },
  {
    operator: enOperator.START_WITH,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele : tyRow) =>
        ele[field as keyof typeof ele]?.toLocaleLowerCase()?.startsWith(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.END_WITH,
    fn: (data: tyRow[], field: string, value: string) =>
      [...data].filter((ele : tyRow) =>
        ele[field as keyof typeof ele]?.toLocaleLowerCase()?.endsWith(value?.toLocaleLowerCase())
      ),
  },

];
  
const textOps = [
    enOperator.CONTAINS,
    enOperator.START_WITH,
    enOperator.END_WITH,
    enOperator.EQUALS,
  ];
  
const numberOps = [enOperator.EQUALS_NUMBER,enOperator.LESS_THAN, enOperator.LESS_THAN_AND_EQUAL, enOperator.GREATER_THAN, enOperator.GREATER_THAN_AND_EQUAL,enOperator.NOT_EQUAL];

type tyRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  amount: number;
}

const FilterTable = ({columns,setFilterData, data}: Props) => {
    const [selectedField, setSelectedField] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [type, setType] = useState("");
    const filterValueRef = useRef(null);

    useEffect(() => {
      const ele = columns.find((col) => col.field === selectedField);
      setType(ele?.type || "text");
    }, [columns, selectedField]);
  

    const handleFilter = (e) => {
      const operation = filtersFunctions.find(
        (fn) => fn.operator === selectedFilter
      );
      
 
  
      setFilterData(operation?.fn(data, selectedField, filterValueRef.current?.value));
    };
  return (
    <div className='flex items-center gap-2 w-1/2 m-4'>
        <Select
          selectedOption={selectedField}
          setSelectedOption={setSelectedField}
          options={columns.map(({ field }) => field)}
        />
        {type === "number" && (
          <Select
            selectedOption={selectedFilter}
            setSelectedOption={setSelectedFilter}
            options={numberOps}
          />
        )}
        {type === "text" && (
          <Select
            selectedOption={selectedFilter}
            setSelectedOption={setSelectedFilter}
            options={textOps}
          />
        )}

        <input
          className='shadow px-4 py-2 rounded-md'
          type='text'
          onChange={handleFilter}
          ref={filterValueRef}
        />
      </div>
  )
}

export default FilterTable
