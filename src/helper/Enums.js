export function IDTypes() {
  return [
    "Passport",
    "(SSS) Social Security System",
    "(GSIS) Government Service Insurance System",
    "(UMID) Unified Multi-Purpose Identification",
    "(LTO) Drivers License",
    "(PRC) Professional Regulatory Commission",
    "(OWWA) Overseas Workers Welfare Administration",
    "(PNP) Philippine National Police",
    "Airman License",
    "Postal ID",
    "Seafarers Record Book",
    "Senior Citizen",
    "PWD",
    "Solo Parent",
    "School ID",
    "Others"
  ];
}

export function BloodTypes() {
  return [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];
}

export function AgentMenus() {
  return [
    "Home.Home",// not parent and no parent id
    "Admin.Dashboard", // not parent and no parent id
    
    "Wallet", // is parent true
    "Wallet.Wallet", // is parent false
    
    "Profile", // is parent true
    "Profile.ProfileInformation", // is parent false
    "Profile.ResetPassword", // is parent false

    "UserAccount", // is parent true
    "UserAccount.UserApproval", // is parent false
    "UserAccount.Agents", // is parent false
    "UserAccount.Players", // is parent false
    
    "History", // is parent true
    "History.GameBets", // is parent false
    "History.GameResult", // is parent false
    
    "Reporting", // is parent true
    "Reporting.SalesReport", // is parent false
    "Reporting.TransactionReport", // is parent false
    "Reporting.UserActivityReport", // is parent false
  ];
}

export function AdminMenus() {
  return [
    "Home.Home",// not parent and no parent id
    "Admin.Dashboard", // not parent and no parent id
    
    "History", // is parent true
    "History.GameBets", // is parent false
    "History.GameResult", // is parent false
    
    "Wallet", // is parent true
    "Wallet.Wallet", // is parent false
    
    "Profile", // is parent true
    "Profile.ProfileInformation", // is parent false
    "Profile.ResetPassword", // is parent false
    
    "SuperAdmin", // is parent true
    "SuperAdmin.SuperAdmin", // is parent false
    "SuperAdmin.Company", // is parent false
    "SuperAdmin.Branch", // is parent false
    "SuperAdmin.Profiles", // is parent false
    
    "UserAccount", // is parent true
    "UserAccount.SystemUsers", // is parent false
    "UserAccount.Operators", // is parent false
    "UserAccount.UserApproval", // is parent false
    "UserAccount.MasterAgents", // is parent false
    "UserAccount.Agents", // is parent false
    "UserAccount.Players", // is parent false
    
    "Game", // is parent true
    "Game.GameScheduleSettings", // is parent false
    "Game Mechanics Settings", // is parent false
    "Game.Price&Prizes", // is parent false
    "Game.GameBets", // is parent false
    "Game.GameResult", // is parent false
    
    "Postings", // is parent true
    "Postings.TextBlast", // is parent false
    "Postings.Announcements", // is parent false
    "Postings.LiveStreaming", // is parent false
    
    "Reporting", // is parent true
    "Reporting.SalesReport", // is parent false
    "Reporting.TransactionReport", // is parent false
    "Reporting.UserActivityReport", // is parent false
  ];
}