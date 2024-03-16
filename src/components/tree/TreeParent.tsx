import { FaArrowDown, FaArrowRight } from "react-icons/fa";

interface Props {
  name: string;
  isOpen: boolean;
}

const TreeParent = ({ name, isOpen }: Props) => {
  return (
    <div className='flex items-center gap-2  p-1 hover:bg-slate-200 cursor-pointer'>
      {isOpen ? <FaArrowDown /> : <FaArrowRight />}
      <span className='capitalize'>{name}</span>
    </div>
  );
};

export default TreeParent;
