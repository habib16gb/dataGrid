import { useEffect, useRef, useState } from "react";
import InputGrid from "./InputGrid";
import HeaderGrid from "./HeaderGrid";
import Select from "../common/Select";
import { GridColDef } from "../../pages/AdvancedDataGridPage";
import rows from "../../data/data";

enum enOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  START_WITH = "start with",
  END_WITH = "end with",
  IS_EMPTY = "is empty",
  IS_NOT_EMPTY = "is not empty",
}

const textOps = [
  enOperator.CONTAINS,
  enOperator.START_WITH,
  enOperator.END_WITH,
  enOperator.EQUALS,
];

const numberOps = ["=", ">", "<", "!=", ">=", "<="];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, type: "number" },
  {
    field: "first_name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 220,
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 110,
    editable: false,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    editable: true,
  },
];

const filtersFunctions = [
  {
    operator: enOperator.CONTAINS,
    fn: (data: unknown[], field: string, value: string) =>
      [...data].filter((ele) =>
        ele[field]?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.EQUALS,
    fn: (data: unknown[], field: string, value: string) =>
      [...data].filter(
        (ele) => ele[field]?.toLocaleLowerCase() === value?.toLocaleLowerCase()
      ),
  },
  {
    operator: enOperator.START_WITH,
    fn: (data: unknown[], field: string, value: string) =>
      [...data].filter((ele) =>
        ele[field]?.toLocaleLowerCase()?.startsWith(value?.toLocaleLowerCase())
      ),
  },
  {
    operator: enOperator.END_WITH,
    fn: (data: unknown[], field: string, value: string) =>
      [...data].filter((ele) =>
        ele[field]?.toLocaleLowerCase()?.endsWith(value?.toLocaleLowerCase())
      ),
  },
  // {
  //   operator: enOperator.IS_EMPTY,
  //   fn: (data: unknown[], field: string) =>
  //     [...data].filter((ele) => ele[field].trim().length === 0),
  // },
  // {
  //   operator: enOperator.IS_NOT_EMPTY,
  //   fn: (data: unknown[], field: string) =>
  //     [...data].filter((ele) => ele[field].trim().length !== 0),
  // },
];

const AdvancedDataGrid = () => {
  const [data, setData] = useState(rows);
  const [selectedField, setSelectedField] = useState("");
  const [type, setType] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const filterValueRef = useRef(null);

  const handleBlur = (e, index: number, field: string) =>
    setData((prev) => {
      const newData = [...prev];
      newData[index][field] = e.target.value;
      return newData;
    });

  useEffect(() => {
    const ele = columns.find((col) => col.field === selectedField);
    setType(ele?.type || "text");
  }, [selectedField]);

  const handleFilter = (e) => {
    const operation = filtersFunctions.find(
      (fn) => fn.operator === selectedFilter
    );
    // setData(
    //   rows.filter((row) =>
    //     row[selectedField]
    //       ?.toLocaleLowerCase()
    //       .includes(e.target.value.toLocaleLowerCase())
    //   )
    // );
    console.log(selectedField, selectedFilter, filterValueRef.current.value);

    setData(operation?.fn(rows, selectedField, filterValueRef.current.value));
  };

  return (
    <div>
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
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>
                <HeaderGrid setData={setData} col={col} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.field}>
                  <InputGrid
                    row={row}
                    col={col}
                    index={index}
                    handleBlur={handleBlur}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvancedDataGrid;
