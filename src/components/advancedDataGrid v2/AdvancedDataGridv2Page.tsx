import DataGridv2 from "./DataGridv2";
import data from "../../data/data";
import { inGridCod } from "./interfaces";
import React, { createContext, useState } from "react";
import { tyRow } from "./types";
import { enPositionArrow } from "./enums";
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
  setRows: React.Dispatch<React.SetStateAction<tyRow[]>>;
  columns: inGridCod[];
  updateDataTable: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => void;
  handleArrow: () => void;
  positionArrow: enPositionArrow;
};

const typeExContextState: TypeExContextType = {
  rows: [],
  setRows: () => [],
  columns: [],
  updateDataTable: function (): void {
    throw new Error("Function not implemented.");
  },
  handleArrow: function (): void {
    throw new Error("Function not implemented.");
  },
  positionArrow: enPositionArrow.NONE,
};

export const DataContext = createContext<TypeExContextType>(typeExContextState);

const AdvancedDataGridv2Page = () => {
  const [rows, setRows] = useState<tyRow[]>(data);
  const [positionArrow, setPositionArrow] = useState(enPositionArrow.NONE);

  const updateDataTable = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    setRows((prev) =>
      prev.map((ele) =>
        ele === prev[index] ? { ...ele, [field]: e.target.value } : ele
      )
    );
  };

  const handleArrow = () => {
    switch (positionArrow) {
      case enPositionArrow.NONE:
        setPositionArrow(enPositionArrow.UP);
        break;
      case enPositionArrow.UP:
        setPositionArrow(enPositionArrow.DOWN);
        break;
      case enPositionArrow.DOWN:
        setPositionArrow(enPositionArrow.NONE);
        break;
    }
  };

  return (
    <DataContext.Provider
      value={{
        rows,
        setRows,
        columns,
        updateDataTable,
        handleArrow,
        positionArrow,
      }}
    >
      <DataGridFilter />
      <DataGridv2 />
    </DataContext.Provider>
  );
};

export default AdvancedDataGridv2Page;
