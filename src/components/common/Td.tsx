import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Td = ({ children }: Props) => {
  return <td  className="px-6 py-4">{children}</td>;
};

export default Td;
