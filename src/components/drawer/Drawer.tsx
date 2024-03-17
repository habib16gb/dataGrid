import { ImMenu3, ImMenu4 } from "react-icons/im";
import RecursiveTree from "../tree/RecursiveTree";
import { useState } from "react";

export interface inElement {
  path: string;
  name: string;
  element: string;
  children?: inElement[];
}

const listMenu: inElement[] = [
  {
    name: "home",
    path: "/",
    element: "home",
    children: [
      { name: "home one", path: "/one", element: "home-one" },
      { name: "home two", path: "/two", element: "home-two" },
      { name: "home three", path: "/three", element: "home-three" },
    ],
  },
  {
    name: "about",
    path: "/about",
    element: "about",
    children: [
      { name: "about one", path: "/one", element: "about-one" },
      { name: "about two", path: "/two", element: "about-two" },
      {
        name: "about three",
        path: "/three",
        element: "about-three",
        children: [
          { name: "about three one", path: "/one", element: "about-three-one" },
          { name: "about three two", path: "/two", element: "about-three-two" },
          {
            name: "about three three",
            path: "/three",
            element: "about-three-three",
          },
          {
            name: "about three four",
            path: "/four",
            element: "about-three-four",
            children: [
              {
                name: "about three four one",
                path: "/one",
                element: "about-three-four-one",
              },
              {
                name: "about three four two",
                path: "/two",
                element: "about-three-four-two",
              },
              {
                name: "about three four three",
                path: "/three",
                element: "about-three-four-three",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "contact",
    path: "/contact",
    element: "contact",
  },
  {
    name: "login",
    path: "/login",
    element: "login",
  },
  {
    name: "register",
    path: "/register",
    element: "register",
  },
];

const Drawer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((pre) => !pre);
  };
  return (
    <div>
      <header className="flex items-center shadow-lg gap-8 text-white px-4 py-2 bg-blue-500">
        {showMenu ? (
          <ImMenu4
            className="w-6 h-6 cursor-pointer "
            onClick={handleShowMenu}
          />
        ) : (
          <ImMenu3
            className="w-6 h-6 cursor-pointer "
            onClick={handleShowMenu}
          />
        )}
        <h1>Logo</h1>
      </header>
      {showMenu && (
        <aside>
          <RecursiveTree listMenu={listMenu} />
        </aside>
      )}
    </div>
  );
};

export default Drawer;
