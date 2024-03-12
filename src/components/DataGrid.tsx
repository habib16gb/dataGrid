import { SetStateAction, useState } from "react";
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

  const handleChange = (e, index, field) => {
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

  const handleChecked = (e) => {
    console.log(e.target);
    console.log(isCheck);
    setIsCheck([...isCheck, +e.target.id]);
    if (!e.target.checked) {
      setIsCheck(isCheck.filter((ele) => ele != e.target.id));
    }
  };

  return (
    <table>
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
                id={row.id}
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
