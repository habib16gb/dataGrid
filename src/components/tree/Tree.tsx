import { inElement } from "../../pages/TreePage";
import TreeItem from "./TreeItem";

interface Props {
  listMenu: inElement[];
}

const Tree = ({ listMenu }: Props) => {
  return (
    <div>
      {listMenu.map((list, index) => (
        <TreeItem list={list} key={index} />
      ))}
    </div>
  );
};

export default Tree;
