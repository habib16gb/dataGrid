import { inElement } from "../../pages/TreePage";
import { TreeItem } from "./TreeItem";

interface Props {
  listMenu: inElement[];
}

const RecursiveTree = ({ listMenu }: Props) => {
  return (
    <div>
      {listMenu.map((item, index) => (
        <TreeItem item={item} key={index} />
      ))}
    </div>
  );
};

export default RecursiveTree;
