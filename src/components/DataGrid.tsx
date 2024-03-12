import { ChangeEvent, useState } from "react";
import { GridColDef, row } from "../interfaces";
import Td from "./common/Td";
import Th from "./common/Th";
import Tr from "./common/Tr";
import Checkbox from "./common/Checkbox";
import { MdDeleteSweep } from "react-icons/md";

interface Props {
  rows: row[];
  colomns: GridColDef[];
}

export default function DataGrid({ rows, colomns }: Props) {
  const [list, setList] = useState<row[]>(rows);
  const [checkAll, setCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<number[]>([]);

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
            {colomns.map(({ headerName }, index) => (
              <Th key={index} headerName={headerName} />
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
    </div>
  );
}
