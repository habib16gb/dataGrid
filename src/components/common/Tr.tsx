import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Tr = ({ children }: Props) => {
  return <tr>{children}</tr>;
};

export default Tr;
