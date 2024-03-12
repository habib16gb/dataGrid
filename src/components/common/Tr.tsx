import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Tr = ({ children }: Props) => {
  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">{children}</tr>;
};

export default Tr;
