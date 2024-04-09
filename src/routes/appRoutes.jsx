import routeLinks from "./routeLinks";
import { GetStoreObject, BuildChildObj } from "../helper/Helpers";

let loginObj = GetStoreObject("auth");
let listMenuObj = GetStoreObject("menuList");

let menus = [];
if (listMenuObj !== null) {
  listMenuObj.forEach(item => {
    if (item.enabled) {
      menus.push(item.menuCode);
    }
  });
}

let finalRoutes = [];
finalRoutes.push(routeLinks[0]);

if (loginObj !== null) {
  // 0 - Dashboard menu
  if (loginObj.groupType === 0) {
    let listRoutes = {
      home: false, administrative: false, userAccounts: false,
      game: false, posts: false, reports: false, system: false
    }

    if (menus !== null) {
      // set parent menu active
      if ((menus.filter(str => str.includes("Administrative.")).length > 0)) { listRoutes.administrative = true; }
      if ((menus.filter(str => str.includes("UserAccounts.")).length > 0)) { listRoutes.userAccounts = true; }
      if ((menus.filter(str => str.includes("Game.")).length > 0)) { listRoutes.game = true; }
      if ((menus.filter(str => str.includes("Posts.")).length > 0)) { listRoutes.posts = true; }
      if ((menus.filter(str => str.includes("Reports.")).length > 0)) { listRoutes.reports = true; }
      if ((menus.filter(str => str.includes("System.")).length > 0)) { listRoutes.system = true; }

      // add child menus
      if (listRoutes.administrative) { finalRoutes.push(BuildChildObj(routeLinks[1], menus.filter(str => str.includes("Administrative.")))); }
      if (listRoutes.userAccounts) { finalRoutes.push(BuildChildObj(routeLinks[2], menus.filter(str => str.includes("UserAccounts.")))); }
      if (listRoutes.game) { finalRoutes.push(BuildChildObj(routeLinks[3], menus.filter(str => str.includes("Game.")))); }
      if (listRoutes.posts) { finalRoutes.push(BuildChildObj(routeLinks[4], menus.filter(str => str.includes("Posts.")))); }
      if (listRoutes.reports) { finalRoutes.push(BuildChildObj(routeLinks[5], menus.filter(str => str.includes("Reports.")))); }
      if (listRoutes.system) { finalRoutes.push(BuildChildObj(routeLinks[6], menus.filter(str => str.includes("System.")))); }
    }
  } else {
    // 1 - Accounting menu
    //  2 - Support menu
    let routelist = routeLinks.filter((item) => menus.includes(item.state));
    routelist.forEach(item => {
      finalRoutes.push(item);
    });
  }
}

// Final list of menus
const appRoutes = finalRoutes;

export default appRoutes;