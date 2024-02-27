import routeLinks from "./routeLinks";
import { GetStoreObject } from "../helper/Helpers";

let authdata = GetStoreObject("auth");
let listMenuObj = GetStoreObject("menuList");

let menus = [];

if (listMenuObj !== null) {
  listMenuObj.forEach(item => {
    menus.push(item.menuCode);
  });
}

let listRoutes = {
  home: false,
  administrative: false,
  userAccounts: false,
  game: false,
  posts: false,
  reports: false,
  system: false
}

// menus.push("SuperAdmin.Profiles");
const buildChildObj = (dataObj, childLinks) => {
  let finalChild = [];
  for (let i = 0; i < childLinks.length; i++) {
    finalChild.push(dataObj.child.find(item => item.state === childLinks[i]));
  }
  dataObj.child.splice(0, dataObj.child.length);
  dataObj.child = finalChild;
  return dataObj;
}

let finalRoutes = [];
finalRoutes.push(routeLinks[0]);

if (menus !== null) {
  // set parent menu active
  if ((menus.filter(str => str.includes("Administrative.")).length > 0)) { listRoutes.administrative = true; }
  if ((menus.filter(str => str.includes("UserAccounts.")).length > 0)) { listRoutes.userAccounts = true; }
  if ((menus.filter(str => str.includes("Game.")).length > 0)) { listRoutes.game = true; }
  if ((menus.filter(str => str.includes("Posts.")).length > 0)) { listRoutes.posts = true; }
  if ((menus.filter(str => str.includes("Reports.")).length > 0)) { listRoutes.reports = true; }
  if ((menus.filter(str => str.includes("System.")).length > 0)) { listRoutes.system = true; }

  // add child menus
  if (listRoutes.administrative) { finalRoutes.push(buildChildObj(routeLinks[1], menus.filter(str => str.includes("Administrative.")))); }
  if (listRoutes.userAccounts) { finalRoutes.push(buildChildObj(routeLinks[2], menus.filter(str => str.includes("UserAccounts.")))); }
  if (listRoutes.game) { finalRoutes.push(buildChildObj(routeLinks[3], menus.filter(str => str.includes("Game.")))); }
  if (listRoutes.posts) { finalRoutes.push(buildChildObj(routeLinks[4], menus.filter(str => str.includes("Posts.")))); }
  if (listRoutes.reports) { finalRoutes.push(buildChildObj(routeLinks[5], menus.filter(str => str.includes("Reports.")))); }
  if (listRoutes.system) { finalRoutes.push(buildChildObj(routeLinks[6], menus.filter(str => str.includes("System.")))); }
}
// Final list of menus
const appRoutes = finalRoutes;
export default appRoutes;