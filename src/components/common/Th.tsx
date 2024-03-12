import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  // children: ReactNode;
  headerName: string;
  onClick: () => void;
}

const Th = ({ headerName, onClick }: Props) => {
  const [arrow, setArrow] = useState(true);
  return (
    <th
      className=' px-6 py-4 cursor-pointer'
      onClick={() => {
        setArrow(!arrow);
        onClick();
      }}
    >
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
