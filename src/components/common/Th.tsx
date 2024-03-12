import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  // children: ReactNode;
  headerName: string;
}

const Th = ({ headerName }: Props) => {
  const [arrow, setArrow] = useState(true);
  const handleArrowDir = () => {
    setArrow(!arrow);
  };
  return (
    <th className=' px-6 py-4 cursor-pointer' onClick={handleArrowDir}>
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
