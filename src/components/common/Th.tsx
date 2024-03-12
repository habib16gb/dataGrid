import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Th = ({ children }: Props) => {
  return <th scope="col" className="p-4">{children}</th>;
};

export default Th;
