import { ChangeEvent, useState } from "react";
import { GridColDef, row } from "../interfaces";
import Td from "./common/Td";
import Th from "./common/Th";
import Tr from "./common/Tr";

interface Props {
  rows: row[];
  colomns: GridColDef[];
}

export default function DataGrid({ rows, colomns }: Props) {
  const [list, setList] = useState<row[]>(rows);
  const [checkAll, setCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: string) => {
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
      setIsCheck(isCheck.filter((ele) => ele && !id));
    }
  };

  return (
    <table className="">
      <thead>
        <Tr>
          <Th>
            <input
              checked={checkAll}
              onChange={handleChackedAll}
              style={{ width: "50px" }}
              type='checkbox'
            />
          </Th>
          {colomns.map(({ headerName }, index) => (
            <Th key={index}>{headerName}</Th>
          ))}
        </Tr>
      </thead>
      <tbody>
        {list.map((row, indexRow) => (
          <Tr key={indexRow}>
            <Td>
              <input
                checked={isCheck.includes(+row.id)}
                onChange={handleChecked}
                style={{ width: "50px" }}
                type='checkbox'
                id={row.id.toString()}
              />
            </Td>
            {colomns.map(({ type, field, width, editable }, indexCol) => (
              <Td key={indexCol}>
                <input
                  value={row[field] || ""}
                  style={{ width }}
                  type={type}
                  readOnly={!editable}
                  onChange={(e) => handleChange(e, indexRow, field)}
                />
              </Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </table>
  );
}
