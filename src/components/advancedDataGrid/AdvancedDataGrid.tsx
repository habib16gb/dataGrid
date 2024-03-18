import { useEffect, useState } from "react";
import InputGrid from "./InputGrid";
import HeaderGrid from "./HeaderGrid";
import { GridColDef } from "../../pages/AdvancedDataGridPage";
import rows from "../../data/data";
import FilterTable from "./FilterTable";
import Button from "../common/Button";

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
    type: "number",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 140,
    editable: true,
    type: "number",
  },
];

const AdvancedDataGrid = () => {
  const [data, setData] = useState(rows);
  const [filterData, setFilterData] = useState(data);
  const [fieldsSelected, setFieldsSelected] = useState({
    first: "",
    second: "",
    third: "",
  });

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const handleBlur = (e, index: number, field: string) =>
    setData((prev) => {
      const newData = [...prev];
      newData[index][field] = e.target.value;
      return newData;
    });

  const handleAddFilter = () => {
    console.log("add filter");
  };
  console.log("render", fieldsSelected, new Date());
  return (
    <div>
      <div>
        <FilterTable
          columns={columns}
          setFilterData={setData}
          data={rows}
          fieldsSelected={fieldsSelected}
          setFieldsSelected={setFieldsSelected}
          keyFilter='first'
        />
        <Button
          onClick={handleAddFilter}
          label='+ add filter'
          classNames='border-green-500 text-green-500'
        />
        <Button
          onClick={handleAddFilter}
          label='x remove filter'
          classNames='border-red-500 text-red-500'
        />
        <FilterTable
          columns={columns}
          setFilterData={setFilterData}
          data={data}
          keyFilter='second'
          fieldsSelected={fieldsSelected}
          setFieldsSelected={setFieldsSelected}
        />
        <FilterTable
          columns={columns}
          setFilterData={setFilterData}
          data={data}
          keyFilter='third'
          fieldsSelected={fieldsSelected}
          setFieldsSelected={setFieldsSelected}
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
