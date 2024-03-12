import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Th = ({ children }: Props) => {
  return <th  className="px-6 py-4">{children}</th>;
};

export default Th;
