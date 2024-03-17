import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { inElement } from "../../pages/TreePage";
import { useEffect, useRef, useState } from "react";

interface Props {
  listMenu: inElement[];
}

const RecursiveTree = ({ listMenu }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef(null);

  const handleOpen = (e) => {
    console.log(e.target);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {listMenu.map((parent, i) => (
        <div key={i}>
          <div
            className='flex items-center  gap-2  w-48 px-2 py-1 hover:bg-slate-200 cursor-pointer'
            onClick={handleOpen}
            ref={divRef}
          >
            {parent.children ? (
              isOpen ? (
                <FaArrowDown />
              ) : (
                <FaArrowRight />
              )
            ) : (
              <GoDash />
            )}
            <span>{parent.name}</span>
          </div>
          {isOpen && (
            <div className='ml-8'>
              {parent.children && <RecursiveTree listMenu={parent.children} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecursiveTree;
