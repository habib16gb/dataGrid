import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { GridColDef, row } from "../interfaces";
import Td from "./common/Td";
import Th from "./common/Th";
import Tr from "./common/Tr";
import Checkbox from "./common/Checkbox";
import { MdDeleteSweep } from "react-icons/md";
// import Filter from "./common/Filter";

interface Props {
  rows: row[];
  colomns: GridColDef[];
}

export enum enOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  START_WITH = "start with",
  END_WITH = "end with",
  IS_EMPTY = "is empty",
  IS_NOT_EMPTY = "is not empty",
}

const filters = [
  {
    operator: enOperator.CONTAINS,
    fn: (data: row[], field: string, value: string) =>
      [...data].filter((ele) => ele[field]?.includes(value)),
  },
  {
    operator: enOperator.EQUALS,
    fn: (data: row[], field: string, value: string) =>
      [...data].filter((ele) => ele[field] == value),
  },
  {
    operator: enOperator.START_WITH,
    fn: (data: row[], field: string, value: string) =>
      [...data].filter((ele) => ele[field]?.startsWith(value)),
  },
  {
    operator: enOperator.END_WITH,
    fn: (data: row[], field: string, value: string) =>
      [...data].filter((ele) => ele[field]?.endsWith(value)),
  },
  {
    operator: enOperator.IS_EMPTY,
    fn: (data: row[], field: string) =>
      [...data].filter((ele) => ele[field].trim().length === 0),
  },
  {
    operator: enOperator.IS_NOT_EMPTY,
    fn: (data: row[], field: string) =>
      [...data].filter((ele) => ele[field].trim().length !== 0),
  },
];

export default function DataGrid({ rows, colomns }: Props) {
  const [list, setList] = useState<row[]>(rows);
  const [checkAll, setCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<number[]>([]);
  const [fieldFilter, setFieldFilter] = useState("id");
  const [operatorFilter, setOperatorFilter] = useState<
    SetStateAction<enOperator>
  >(enOperator.CONTAINS);

  const fieldRef = useRef(null);
  const operatorRef = useRef(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    setList(
      list.map((ele) =>
        ele[field] === list[index][field]
          ? { ...ele, [field]: e.target.value }
          : ele
      )
    );
  };

  const handleChackedAll = () => {
    setCheckAll(!checkAll);
    setIsCheck(list.map((ele) => ele.id));
    if (checkAll) {
      setIsCheck([]);
    }
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, +id]);
    if (!checked) {
      setIsCheck(isCheck.filter((ele) => ele != id));
    }
  };

  const handleDelete = () => {
    setList(list.filter((ele) => !isCheck.includes(ele.id)));
    setIsCheck([]);
    setCheckAll(false);
  };

  const handleFilter = (e) => {
    const obj = filters.find(
      (ele) => ele.operator == operatorRef.current.value
    );
    setList(obj?.fn(rows, fieldRef.current.value, e.target.value));
    console.log(operatorRef.current.value);
    console.log(list);
  };

  return (
    <div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-4'>
              <Checkbox
                id='checkAll'
                checked={checkAll}
                onChange={handleChackedAll}
              />
            </th>
            {colomns.map(({ headerName, field }, index) => (
              <Th
                key={index}
                headerName={headerName}
                setList={setList}
                field={field}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((row, indexRow) => (
            <Tr key={indexRow}>
              <td className='px-6 py-4'>
                <Checkbox
                  id={row.id.toString()}
                  onChange={handleChecked}
                  checked={isCheck.includes(+row.id)}
                />
              </td>
              {colomns.map(({ type, field, width, editable }, indexCol) => (
                <Td key={indexCol}>
                  <input
                    value={row[field] || ""}
                    style={{ width }}
                    type={type}
                    readOnly={!editable}
                    onChange={(e) => handleChange(e, indexRow, field)}
                    className='px-6 py-4'
                  />
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </table>
      {isCheck.length > 0 && (
        <button
          onClick={handleDelete}
          className='border-2 border-white text-white bg-red-500 m-2 cursor-pointer rounded-full flex items-center gap-2 px-2 py-1 hover:border-red-500 hover:text-red-500 hover:bg-transparent transition'
        >
          <span>{isCheck.length} selected</span>
          <MdDeleteSweep className='text-xl' />
        </button>
      )}
      <div className='filter flex'>
        <div className='m-4'>
          <div className='flex gap-4'>
            <label htmlFor='col'>Columns</label>
            <select
              value={fieldFilter}
              ref={fieldRef}
              onChange={(e) => setFieldFilter(e.target.value)}
              name='col'
              id='col'
            >
              {colomns.map(({ field }, index) => (
                <option key={index}>{field}</option>
              ))}
            </select>
          </div>
          <div className='flex gap-4'>
            <label htmlFor='operator'>Operator</label>
            <select
              value={operatorFilter}
              onChange={(e) => setOperatorFilter(e.target.value)}
              ref={operatorRef}
              name='operator'
              id='operator'
            >
              {filters.map((ele, index) => (
                <option key={index}>{ele.operator}</option>
              ))}
            </select>
          </div>
        </div>
        <input className='shadow m-4 p-2' type='text' onChange={handleFilter} />
      </div>
    </div>
  );
}
