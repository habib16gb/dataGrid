import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";

enum enPosition {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}

const HeaderGrid = ({ col, setData }) => {
  const [arrow, setArrow] = useState(enPosition.NONE);
  const handleArrow = () => {
    setArrow((prev) => {
      switch (prev) {
        case enPosition.UP:
          return enPosition.DOWN;
        case enPosition.DOWN:
          return enPosition.NONE;
        case enPosition.NONE:
          return enPosition.UP;
      }
    });
  };

  const handleSort = () => {
    switch (arrow) {
      case enPosition.UP:
        setData((prev) =>
          [...prev].sort((a, b) => {
            if (a[col.field] < b[col.field]) return 1;
            if (a[col.field] > b[col.field]) return -1;
            return 0;
          }),
        );
        break;
      case enPosition.DOWN:
        setData((prev) =>
          [...prev].sort((a, b) => {
            if (a["id"] > b["id"]) return 1;
            if (a["id"] < b["id"]) return -1;
            return 0;
          }),
        );
        break;
      case enPosition.NONE:
        setData((prev) =>
          [...prev].sort((a, b) => {
            if (a[col.field] > b[col.field]) return 1;
            if (a[col.field] < b[col.field]) return -1;
            return 0;
          }),
        );
        break;
    }
  };

  return (
    <div
      onClick={() => {
        handleArrow();
        handleSort();
      }}
      className="font-bold flex items-center gap-4 text-blue-700 dark:text-white dark:hover:text-blue-500 hover:text-blue-500 cursor-pointer"
    >
      <span>{col.headerName}</span>
      {arrow === enPosition.DOWN ? (
        <FaArrowDown />
      ) : arrow === enPosition.UP ? (
        <FaArrowUp />
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderGrid;
