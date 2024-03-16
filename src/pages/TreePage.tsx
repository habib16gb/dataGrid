import Tree from "../components/tree/Tree";

export interface inElement {
  path: string;
  name: string;
  element: string;
  children?: inElement[];
}

const listMenu: inElement[] = [
  {
    path: "/",
    element: "page1",
    name: "page1",
    children: [
      {
        path: "/home",
        element: "home",
        name: "home",
      },
      { path: "/contact", name: "contact", element: "contact" },
      { path: "/about", name: "about", element: "about" },
    ],
  },
  {
    path: "/page2",
    name: "page2",
    element: "page2",
    children: [
      {
        path: "/home",
        element: "home",
        name: "home",
        children: [
          { path: "/innerPage2", name: "innerPage2", element: "innerPage2" },
        ],
      },
      { path: "/contact", name: "contact", element: "contact" },
      { path: "/about", name: "about", element: "about" },
    ],
  },
  { path: "/page4", name: "page3", element: "page3" },
  { path: "/page4", name: "page4", element: "page4" },
];

const TreePage = () => {
  return <Tree listMenu={listMenu} />;
};

export default TreePage;
