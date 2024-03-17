import { GridColDef } from "../../interfaces";

interface InputGridProps {
  row: any;
  col: GridColDef;
  index: number;
  handleBlur: (e: any, index: number, field: string) => void;
}

const InputGrid = ({ row, col, index, handleBlur }: InputGridProps) => {
  return (
    <input
      className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type={col.type}
      readOnly={!col.editable}
      defaultValue={row[col.field]}
      style={{ width: col.width }}
      onBlur={(e) => handleBlur(e, index, col.field)}
    />
  );
};
export default InputGrid;
