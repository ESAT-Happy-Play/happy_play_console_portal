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

export function NatureOfWorkList() {
  return [
    "Goverment",
    "IT Industry",
    "Insurance",
    "Health",
    "Others"
  ];
}

export function SourceOfIncomeList() {
  return [
    "Employment",
    "Business",
    "Others"
  ];
}

export function AgentMenus() {
  return [
    "Home.Home",// not parent and no parent id
    "Admin.Dashboard", // not parent and no parent id
    
    "Wallet", // is parent true
    "Wallet.SendCredits", // is parent false
    "Wallet.CreditRequests", // is parent false
    "Wallet.Withdraw", // is parent false
    
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
    
    // "History", // is parent true
    // "History.GameBets", // is parent false
    // "History.GameResult", // is parent false
    
    "Wallet", // is parent true
    "Wallet.SendCredits", // is parent false
    "Wallet.CreditRequests", // is parent false
    "Wallet.Withdraw", // is parent false
    "Wallet.WithdrawalRequests", // is parent false
    
    "Profile", // is parent true
    "Profile.ProfileInformation", // is parent false
    "Profile.ResetPassword", // is parent false
    
    "SuperAdmin", // is parent true
    "SuperAdmin.SuperAdmin", // is parent false
    "SuperAdmin.Company", // is parent false
    "SuperAdmin.Branch", // is parent false
    "SuperAdmin.Profiles", // is parent false
    "SuperAdmin.Games", // is parent false
    
    "UserAccount", // is parent true
    "UserAccount.SystemUsers", // is parent false
    "UserAccount.Operators", // is parent false
    "UserAccount.UserApproval", // is parent false
    "UserAccount.UserVerification", // is parent false
    "UserAccount.MasterAgents", // is parent false
    "UserAccount.Agents", // is parent false
    "UserAccount.Players", // is parent false
    
    "Game", // is parent true
    "Game.GameScheduleSettings", // is parent false
    "Game.GameMechanicsSettings", // is parent false
    "Game.GameWinningSettings", // is parent false
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
    "Reporting.UserGrowth", // is parent false
  ];
}

export function GetUserAccess(data) {
  var excludeLinks = [];

  if(data === null)
    return excludeLinks;

  if(data.g1_superAdmin === 1) { excludeLinks.push("SuperAdmin.SuperAdmin") }
  if(data.g1_company === 1) { excludeLinks.push("SuperAdmin.Company") }
  if(data.g1_branch === 1) { excludeLinks.push("SuperAdmin.Branch") }
  if(data.g1_profiles === 1) { excludeLinks.push("SuperAdmin.Profiles") }
  if(data.g1_games === 1) { excludeLinks.push("SuperAdmin.Games") }

  if(data.g2_systemUsers === 1) { excludeLinks.push("UserAccount.SystemUsers") }
  if(data.g2_operators === 1) { excludeLinks.push("UserAccount.Operators") }
  if(data.g2_userVerification === 1) { excludeLinks.push("UserAccount.UserVerification") }
  if(data.g2_masterAgents === 1) { excludeLinks.push("UserAccount.MasterAgents") }
  if(data.g2_agents === 1) { excludeLinks.push("UserAccount.Agents") }
  if(data.g2_players === 1) { excludeLinks.push("UserAccount.Players") }

  if(data.g3_gameScheduleSettings === 1) { excludeLinks.push("Game.GameScheduleSettings") }
  if(data.g3_gameMecahnicsSettings === 1) { excludeLinks.push("Game.MechanicsSettings") }
  if(data.g3_gameWinningSettings === 1) { excludeLinks.push("Game.GameWinningSettings") }
  if(data.g3_bets === 1) { excludeLinks.push("Game.GameBets") }
  if(data.g3_gameResult === 1) { excludeLinks.push("Game.GameResult") }

  if(data.g4_txtBlast === 1) { excludeLinks.push("Postings.TextBlast") }
  if(data.g4_announcements === 1) { excludeLinks.push("Postings.Announcements") }
  if(data.g4_livestreaming === 1) { excludeLinks.push("Postings.LiveStreaming") }
  
  if(data.g5_sales === 1) { excludeLinks.push("Reporting.SalesReport") }
  if(data.g5_transactions === 1) { excludeLinks.push("Reporting.TransactionReport") }
  if(data.g5_userActivity === 1) { excludeLinks.push("Reporting.UserActivityReport") }
  if(data.g5_userGrowth === 1) { excludeLinks.push("Reporting.UserGrowth") }

  return excludeLinks;
}

export function NationalityList() {
  return [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean"
  ];
}