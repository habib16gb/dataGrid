import { LegacyRef } from "react";
import { GridColDef, row } from "../../interfaces";
import { enOperator } from "../DataGrid";

interface Filter {
  operator: enOperator;
  fn: (data: row[], field: string, value: string) => row[];
}
[];

interface Props {
  filters: Filter[];
  columns: GridColDef[];
  ref: LegacyRef<HTMLSelectElement>;
  refField: LegacyRef<HTMLSelectElement>;
}

const Filter = ({ filters, columns, ref, refField }: Props) => {
  return (
    <div className='m-4'>
      <div className='flex gap-4'>
        <label htmlFor='col'>Columns</label>
        <select ref={refField} name='col' id='col'>
          {columns.map(({ field }, index) => (
            <option key={index}>{field}</option>
          ))}
        </select>
      </div>
      <div className='flex gap-4'>
        <label htmlFor='operator'>Operator</label>
        <select ref={ref} name='operator' id='operator'>
          {filters.map((ele, index) => (
            <option key={index}>{ele.operator}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
