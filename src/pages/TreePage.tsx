import RecursiveTree from "../components/tree/RecursiveTree";

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
      {
        path: "/contact",
        name: "contact",
        element: "contact",
        children: [
          {
            path: "/innerPage1",
            name: "innerPage1",
            element: "innerPage1",
            children: [
              {
                path: "/innerPage2",
                name: "innerPage2",
                element: "innerPage2",
              },
              {
                path: "/innerPage3",
                name: "innerPage3",
                element: "innerPage3",
              },
              {
                path: "/innerPage4",
                name: "innerPage4",
                element: "innerPage4",
                children: [
                  {
                    path: "/innerPage5",
                    name: "innerPage5",
                    element: "innerPage5",
                  },
                  {
                    path: "/innerPage6",
                    name: "innerPage6",
                    element: "innerPage6",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/about",
        name: "about",
        element: "about",
        children: [
          { path: "/innerPage1", name: "innerPage1", element: "innerPage1" },
        ],
      },
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
  return <RecursiveTree listMenu={listMenu} />;
};

export default TreePage;
