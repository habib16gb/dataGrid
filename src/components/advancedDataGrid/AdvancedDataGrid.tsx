import { useState } from "react";
import InputGrid from "./InputGrid";
import HeaderGrid from "./HeaderGrid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type GridColDef = {
  field: string;
  headerName: string;
  width: number;
  description?: string;
  editable?: boolean;
  sortable?: boolean;
  type?: "text" | "number" | "boolean";
};

enum enOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  START_WITH = "start with",
  END_WITH = "end with",
  IS_EMPTY = "is empty",
  IS_NOT_EMPTY = "is not empty",
}

const operators = [
  { type: "text", opes: ["add", "delete", "edit"] },
  { type: "number", opes: ["equal", "getter", "better"] },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const AdvancedDataGrid = () => {
  const [data, setData] = useState(rows);
  const [fieldSelect, setFieldSelect] = useState("");

  const handleBlur = (e, index: number, field: string) =>
    setData((prev) => {
      const newData = [...prev];
      newData[index][field] = e.target.value;
      return newData;
    });

  const handleFilter = (event: SelectChangeEvent) => {
    console.log(event.target);
    setFieldSelect(event.target.value);
  };

  return (
    <div>
      <div>
        <Select value={fieldSelect} onChange={handleFilter}>
          {columns.map((col, index) => (
            <MenuItem key={index} value={col.field}>
              {col.field}
            </MenuItem>
          ))}
        </Select>
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
