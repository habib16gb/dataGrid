import { useContext, useState } from "react";
import { enPositionArrow } from "../enums";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { tyRow } from "../types";
import { DataContext } from "../AdvancedDataGridv2Page";

interface Props {
  field: string;
  index: number;
}

const DataGridTh = ({ field, index }: Props) => {
  const context = useContext(DataContext);
  const { setRows } = context;
  const [positionArrow, setPositionArrow] = useState(enPositionArrow.NONE);

  const handleArrow = () => {
    switch (positionArrow) {
      case enPositionArrow.NONE:
        setPositionArrow(enPositionArrow.UP);
        break;
      case enPositionArrow.UP:
        setPositionArrow(enPositionArrow.DOWN);
        break;
      case enPositionArrow.DOWN:
        setPositionArrow(enPositionArrow.NONE);
        break;
    }
  };

  const showArrows = () => {
    switch (positionArrow) {
      case enPositionArrow.NONE:
        return "";
      case enPositionArrow.UP:
        return <IoMdArrowRoundUp />;
      case enPositionArrow.DOWN:
        return <IoMdArrowRoundDown />;
    }
  };

  const handleSort = (field: string) => {
    switch (positionArrow) {
      case enPositionArrow.UP:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a[field as keyof tyRow] < b[field as keyof tyRow]) return 1;
            if (a[field as keyof tyRow] > b[field as keyof tyRow]) return -1;
            return 0;
          })
        );
        break;
      case enPositionArrow.DOWN:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a["id"] > b["id"]) return 1;
            if (a["id"] < b["id"]) return -1;
            return 0;
          })
        );
        break;
      case enPositionArrow.NONE:
        setRows((prev) =>
          [...prev].sort((a, b) => {
            if (a[field as keyof tyRow] > b[field as keyof tyRow]) return 1;
            if (a[field as keyof tyRow] < b[field as keyof tyRow]) return -1;
            return 0;
          })
        );
        break;
    }
  };
  return (
    <th
      className='border-b-2 p-2 text-left border-blue-900 hover:text-blue-900 cursor-pointer '
      key={index}
    >
      <div
        onClick={() => {
          handleArrow();
          handleSort(field);
        }}
        className='flex items-center gap-2'
      >
        <span>{field}</span>
        {showArrows()}
      </div>
    </th>
  );
};

export default DataGridTh;
