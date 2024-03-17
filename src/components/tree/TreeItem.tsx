import { useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { GoDash } from "react-icons/go";

interface inElement {
  path: string;
  name: string;
  element: string;
  children?: inElement[];
}
interface Props {
  item: inElement;
}

export function TreeItem({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className="flex items-center  gap-2 w-48 px-2 py-1 hover:bg-slate-200 cursor-pointer"
        onClick={handleOpen}
      >
        {item.children ? (
          isOpen ? (
            <FaArrowDown />
          ) : (
            <FaArrowRight />
          )
        ) : (
          <GoDash />
        )}
        <span>{item.name}</span>
      </div>
      {isOpen && (
        <div className="ml-8">
          {item.children?.map((item, index) => (
            <TreeItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
