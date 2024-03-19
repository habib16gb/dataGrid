import { useContext } from "react";
import { DataContext } from "../AdvancedDataGridv2Page";
import DataGridInput from "./DataGridInput";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { enPositionArrow } from "../enums";
import { tyRow } from "../types";

const DataGridTable = () => {
  const context = useContext(DataContext);
  const { rows, columns, handleArrow, positionArrow, setRows } = context;

  const showArrows = () => {
    switch (positionArrow) {
      case enPositionArrow.NONE:
        return "";
      case enPositionArrow.UP:
        return <IoMdArrowRoundUp />;
      case enPositionArrow.DOWN:
        return <IoMdArrowRoundDown />;
    }
  };

  const handleSort = (field: string) => {
    switch (positionArrow) {
      case enPositionArrow.UP:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a[field as keyof tyRow] < b[field as keyof tyRow]) return 1;
            if (a[field as keyof tyRow] > b[field as keyof tyRow]) return -1;
            return 0;
          })
        );
        break;
      case enPositionArrow.DOWN:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a["id"] > b["id"]) return 1;
            if (a["id"] < b["id"]) return -1;
            return 0;
          })
        );
        break;
      case enPositionArrow.NONE:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a[field as keyof tyRow] > b[field as keyof tyRow]) return 1;
            if (a[field as keyof tyRow] < b[field as keyof tyRow]) return -1;
            return 0;
          })
        );
        break;
    }
  };
  return (
    <table className='w-full py-4'>
      <thead>
        <tr className=''>
          {columns.map(({ field }, index) => (
            <th
              className='border-b-2 p-2 text-left border-blue-900 hover:text-blue-900 cursor-pointer '
              key={index}
            >
              <div
                onClick={() => {
                  handleArrow();
                  handleSort(field);
                }}
                className='flex items-center gap-2'
              >
                <span>{field}</span>
                {showArrows()}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className='border-b-2 border-slate-300 cursor-pointer'
          >
            {columns.map((col, jindex) => (
              <td key={jindex} className=''>
                <DataGridInput col={col} index={index} row={row} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataGridTable;
