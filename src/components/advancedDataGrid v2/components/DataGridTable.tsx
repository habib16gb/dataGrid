import { useContext } from "react";
import { DataContext } from "../AdvancedDataGridv2Page";
import DataGridInput from "./DataGridInput";

import DataGridTh from "./DataGridTh";

const DataGridTable = () => {
  const context = useContext(DataContext);
  const { rows, columns, dataFiltered } = context;

  return (
    <table className='w-full py-4'>
      <thead>
        <tr className=''>
          {columns.map(({ field }, index) => (
            <DataGridTh key={index} field={field} index={index} />
          ))}
        </tr>
      </thead>
      <tbody>
        {dataFiltered?.map((row, index) => (
          <tr
            key={index}
            className='border-b-2 border-slate-300 cursor-pointer'
          >
            {columns.map((col, jindex) => (
              <td key={jindex} className=''>
                <DataGridInput col={col} id={row.id} row={row} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataGridTable;
