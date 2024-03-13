import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { row } from "../../interfaces";

interface Props {
  headerName: string;
  setList: Dispatch<SetStateAction<row[]>>;
  field: string;
}

const Th = ({ headerName, setList, field }: Props) => {
  const [arrow, setArrow] = useState(true);
  const handleSort = () => {
    setArrow(!arrow);
    setList((data) =>
      [...data].sort((a, b) => {
        return arrow
          ? a[field] > b[field]
            ? 1
            : a[field] < b[field]
            ? -1
            : 0
          : a[field] > b[field]
          ? -1
          : a[field] < b[field]
          ? 1
          : 0;
      })
    );
  };
  return (
    <th className=' px-6 py-4 cursor-pointer' onClick={handleSort}>
      <div className='flex items-center gap-2'>
        <span>{headerName}</span>
        {arrow ? (
          <FaArrowUp className='w-3 h-3 rounded-full ' />
        ) : (
          <FaArrowDown className='w-3 h-3 rounded-full ' />
        )}
      </div>
    </th>
  );
};

export default Th;
