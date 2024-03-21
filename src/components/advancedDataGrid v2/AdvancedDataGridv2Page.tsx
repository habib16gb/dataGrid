import DataGridv2 from "./DataGridv2";
import data from "../../data/data";
import { inGridCod } from "./interfaces";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { tyRow } from "./types";

import DataGridFilter from "./components/DataGridFilter";

const columns: inGridCod[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    editable: false,
    sortable: false,
    type: "number",
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 120,
    editable: true,
    sortable: true,
    type: "text",
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 120,
    editable: true,
    sortable: true,
    type: "text",
  },
  {
    field: "email",
    headerName: "Email",
    width: 120,
    editable: true,
    sortable: true,
    type: "text",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 120,
    editable: true,
    sortable: true,
    type: "text",
  },
  {
    field: "age",
    headerName: "Age",
    width: 80,
    editable: true,
    sortable: true,
    type: "number",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 120,
    editable: true,
    sortable: true,
    type: "number",
  },
];

type TypeExContextType = {
  rows: tyRow[];
  dataFiltered: tyRow[] | undefined;
  setRows: React.Dispatch<React.SetStateAction<tyRow[] | undefined>>;
  columns: inGridCod[];
  updateDataTable: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => void;
  setDataFiltered: React.Dispatch<React.SetStateAction<tyRow[] | undefined>>;
};

const typeExContextState: TypeExContextType = {
  rows: [],
  setRows: () => [],
  columns: [],
  updateDataTable: function (): void {
    throw new Error("Function not implemented.");
  },
  setDataFiltered: function (): void {
    throw new Error("Function not implemented.");
  },
  dataFiltered: [],
};

export const DataContext = createContext<TypeExContextType>(typeExContextState);

const AdvancedDataGridv2Page = () => {
  const [rows, setRows] = useState<tyRow[] | undefined>(data);
  const [filterComponents, setFilterComponents] = useState<ReactNode[]>([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    setDataFiltered(rows);
  }, [rows]);

  const updateDataTable = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: string
  ) => {
    setRows(
      rows?.map((ele) =>
        ele.id === id ? { ...ele, [field]: e.target.value } : ele
      )
    );
  };

  const handleCloseFilter = (index: number) => {
    setFilterComponents((prev) => prev.filter((ele) => ele !== prev[index]));
  };

  const handleAddFilter = () => {
    setFilterComponents([
      ...filterComponents,
      <DataGridFilter data={data} key={filterComponents.length} />,
    ]);
  };

  console.log({ rows, dataFiltered });

  return (
    <DataContext.Provider
      value={{
        rows,
        setRows,
        columns,
        updateDataTable,
        setDataFiltered,
        dataFiltered,
      }}
    >
      <div className='flex flex-col items-start gap-2 mt-2 ml-4'>
        <button
          onClick={handleAddFilter}
          className='rounded-full bg-green-500 text-white px-3 py-2 text-sm mt-4'
        >
          + Filter
        </button>
        {filterComponents.map((cmp, index) => (
          <div className='flex items-center gap-4' key={index}>
            <div className='p-4 shadow-md mb-2 flex items-center gap-4'>
              <button
                onClick={() => handleCloseFilter(index)}
                className='w-4 h-4 rounded-full text-white bg-red-500 flex items-center justify-center p-3'
              >
                x
              </button>
              {cmp}
            </div>
          </div>
        ))}
      </div>

      <DataGridv2 />
    </DataContext.Provider>
  );
};

export default AdvancedDataGridv2Page;
