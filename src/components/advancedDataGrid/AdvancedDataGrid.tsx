import { useState } from "react";
import InputGrid from "./InputGrid";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type GridColDef = {
  field: string;
  headerName: string;
  width: number;
  description?: string;
  editable?: boolean;
  sortable?: boolean;
  type?: "text" | "number" | "boolean";
};

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

enum enPosition {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}

const AdvancedDataGrid = () => {
  const [data, setData] = useState(rows);
  const [arrow, setArrow] = useState(enPosition.NONE);

  const handleBlur = (e, index: number, field: string) =>
    setData((prev) => {
      const newData = [...prev];
      newData[index][field] = e.target.value;
      return newData;
    });

  const handleArrow = () => {
    setArrow((prev) => {
      switch (prev) {
        case enPosition.UP:
          return enPosition.DOWN;
        case enPosition.DOWN:
          return enPosition.NONE;
        case enPosition.NONE:
          return enPosition.UP;
      }
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field}>
              <div
                onClick={handleArrow}
                className="font-bold flex items-center gap-4 text-blue-700 dark:text-white dark:hover:text-blue-500 hover:text-blue-500 cursor-pointer"
              >
                <span>{col.headerName}</span>
                {arrow === enPosition.DOWN ? (
                  <FaArrowDown />
                ) : arrow === enPosition.UP ? (
                  <FaArrowUp />
                ) : (
                  ""
                )}
              </div>
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
  );
};

export default AdvancedDataGrid;
