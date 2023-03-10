export interface MenuOptions {
  name: string;
  route: string;
}

const menuOptions: MenuOptions[] = [
  {
    name: "Overall",
    route: "/",
  },
  {
    name: "Manage Stats",
    route: "/managestats",
  },
  {
    name: "Wingspan Calculator",
    route: "/wingspancalculator",
  },
];

export default menuOptions;
