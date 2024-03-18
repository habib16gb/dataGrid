import { useEffect, useState } from "react";
import InputGrid from "./InputGrid";
import HeaderGrid from "./HeaderGrid";
import { GridColDef } from "../../pages/AdvancedDataGridPage";
import rows from "../../data/data";
import FilterTable from "./FilterTable";



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
    type: "number"
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 140,
    editable: true,
    type: "number"
  },
];

const AdvancedDataGrid = () => {
  const [data, setData] = useState(rows);
  const [filterData, setFilterData] = useState(data)
 
  useEffect(() => {
    setFilterData(data)
  },[data])
 

  const handleBlur = (e, index: number, field: string) =>
    setData((prev) => {
      const newData = [...prev];
      newData[index][field] = e.target.value;
      return newData;
    });

    console.log('data',data)
    console.log('filterdata',filterData)
  return (
    <div>
      <div>
        <FilterTable columns={columns} setFilterData={setData} data={rows} />
        <FilterTable columns={columns} setFilterData={setFilterData} data={data}  />
        <FilterTable columns={columns} setFilterData={setFilterData} data={data}  />
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
          {filterData.map((row, index) => (
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
