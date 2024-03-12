import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Th = ({ children }: Props) => {
  return <th>{children}</th>;
};

export default Th;
