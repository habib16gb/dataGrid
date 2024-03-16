import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { inElement } from "../../pages/TreePage";
import { useState } from "react";

interface Props {
  list: inElement;
}

const className =
  "flex items-center p-1 gap-2 hover:bg-blue-200 cursor-pointer";

const TreeItem = ({ list }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='w-48  '>
      <div className={className + " "} onClick={handleOpen}>
        {list.children ? (
          isOpen ? (
            <FaArrowDown />
          ) : (
            <FaArrowRight />
          )
        ) : (
          <GoDash />
        )}
        <span>{list.name}</span>
      </div>
      {isOpen && (
        <div>
          {list.children?.map((ele, index) => (
            <div className='ml-8' key={index}>
              {ele.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
