import { useContext } from "react";
import { DataContext } from "../AdvancedDataGridv2Page";
import { inGridCod } from "../interfaces";
import { tyRow } from "../types";

interface Props {
  col: inGridCod;
  row: tyRow;
  index: number;
}

const DataGridInput = ({ col, row, index }: Props) => {
  const context = useContext(DataContext);
  const { updateDataTable } = context;
  return (
    <input
      className='p-2 overflow-ellipsis hover:bg-blue-100 focus:outline-none'
      type={col.type}
      readOnly={!col.editable}
      value={row[col.field as keyof typeof row]}
      style={{ width: col.width }}
      onChange={(e) => updateDataTable(e, index, col.field)}
    />
  );
};

export default DataGridInput;
