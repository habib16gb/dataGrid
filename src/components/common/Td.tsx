import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Td = ({ children }: Props) => {
  return <td scope="col" className="p-4">{children}</td>;
};

export default Td;
