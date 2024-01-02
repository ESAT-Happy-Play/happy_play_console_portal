import routeLinks from "./routeLinks";
import { GetStoreObject } from "../helper/Helpers";
import { AgentMenus, AdminMenus, GetUserAccess } from "../helper/Enums";

let authdata = GetStoreObject("auth");
let user_role = GetStoreObject("role");

let menus = [];

if(user_role != null) {
  if (user_role.role === "Agent") {
    menus = AgentMenus();
  } else {
    menus = AdminMenus();

    // remove some links
    if(authdata !== null) {
      let excludeUserAccess = GetUserAccess(authdata.userProfile);
      menus = menus.filter((menu) => excludeUserAccess.includes(menu));

      // manually add profile links
      menus.push("Profile.ProfileInformation");
      menus.push("Profile.ResetPassword");
    }
  }
}

let listRoutes = {
  home: false,
  dashboard: false,
  history: false,
  wallet: false,
  profile: false,
  superAdmin: false,
  userAccount: false,
  game: false,
  postings: false,
  reporting: false
}

// menus.push("SuperAdmin.Profiles");
const buildChildObj = (dataObj, childLinks) => {
  let finalChild = [];
  for (let i = 0; i < childLinks.length; i++) {
    finalChild.push(dataObj.child.find(item => item.state === childLinks[i]));
  }
  dataObj.child.splice(0,dataObj.child.length);
  dataObj.child = finalChild;
  return dataObj;
}

let finalRoutes = [];

if(user_role != null) {
  (user_role.role !== "Agent") ? finalRoutes.push(routeLinks[1]) : finalRoutes.push(routeLinks[0]);
}

if (menus !== null) {

  // set parent menu active
  if ((menus.filter(str => str.includes("History.")).length > 0)) { listRoutes.history = true; }
  if ((menus.filter(str => str.includes("Wallet.")).length > 0)) { listRoutes.wallet = true; }
  if ((menus.filter(str => str.includes("Profile.")).length > 0)) { listRoutes.profile = true; }
  if ((menus.filter(str => str.includes("SuperAdmin.")).length > 0)) { listRoutes.superAdmin = true; }
  if ((menus.filter(str => str.includes("UserAccount.")).length > 0)) { listRoutes.userAccount = true; }
  if ((menus.filter(str => str.includes("Game.")).length > 0)) { listRoutes.game = true; }
  if ((menus.filter(str => str.includes("Postings.")).length > 0)) { listRoutes.postings = true; }
  if ((menus.filter(str => str.includes("Reporting.")).length > 0)) { listRoutes.reporting = true; }

  // add child menus
  if (listRoutes.superAdmin) { finalRoutes.push(buildChildObj(routeLinks[5], menus.filter(str => str.includes("SuperAdmin.")))); }
  if (listRoutes.profile) { finalRoutes.push(buildChildObj(routeLinks[4], menus.filter(str => str.includes("Profile.")))); }
  if (listRoutes.wallet) { finalRoutes.push(buildChildObj(routeLinks[3], menus.filter(str => str.includes("Wallet.")))); }
  if (listRoutes.userAccount) { finalRoutes.push(buildChildObj(routeLinks[6], menus.filter(str => str.includes("UserAccount.")))); }
  if (listRoutes.game) { finalRoutes.push(buildChildObj(routeLinks[7], menus.filter(str => str.includes("Game.")))); }
  if (listRoutes.postings) { finalRoutes.push(buildChildObj(routeLinks[8], menus.filter(str => str.includes("Postings.")))); }
  if (listRoutes.reporting) { finalRoutes.push(buildChildObj(routeLinks[9], menus.filter(str => str.includes("Reporting.")))); }
  if (listRoutes.history) { finalRoutes.push(buildChildObj(routeLinks[2], menus.filter(str => str.includes("History.")))); }
}

// Final list of menus
const appRoutes = finalRoutes;

export default appRoutes;