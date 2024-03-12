import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Td = ({ children }: Props) => {
  return <td className=''>{children}</td>;
};

export default Td;
