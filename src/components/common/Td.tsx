import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Td = ({ children }: Props) => {
  return <td>{children}</td>;
};

export default Td;
