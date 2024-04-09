import HomeIcon from "@mui/icons-material/Home";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import GroupsIcon from "@mui/icons-material/Groups";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SettingsIcon from "@mui/icons-material/Settings";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ChatIcon from "@mui/icons-material/Chat";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PsychologyIcon from "@mui/icons-material/Psychology";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import WalletIcon from "@mui/icons-material/Wallet";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { Company, Branch, Roles, SystemUsers } from "../views";

import PageLayout from "../components/layout/PageLayout";
import AboutUs from "../views/about_us/AboutUs";
import ActivityReports from "../views/activity_reports/ActivityReports";
import Agents from "../views/agents/Agents";
import Annoucements from "../views/annoucements/Annoucements";
import Bets from "../views/bets/Bets";
import GamePrizes from "../views/game_prizes/GamePrizes";
import GameResults from "../views/game_results/GameResults";
import Games from "../views/games/Games";
import Growth from "../views/growth_reports/Growth";
import Home from "../views/home/Home";
import Livestream from "../views/livestream/Livestream";
import MasterAgents from "../views/master_agents/MasterAgents";
import MechanicsSettings from "../views/mechanics_settings/MechanicsSettings";
import Performance from "../views/performance_reports/Performance";
import Players from "../views/players/Players";
import PrivacyPolicy from "../views/privacy_policy/PrivacyPolicy";
import Promotions from "../views/promotions/Promotions";
import ReportAnIssue from "../views/report_an_issue/ReportAnIssue";
import Revenue from "../views/revenue_reports/Revenue";
import ScheduleSettings from "../views/schedule_settings/ScheduleSettings";
import StoreSettings from "../views/store_settings/StoreSettings";
import Terms from "../views/terms_of_use/Terms";
import TextBlast from "../views/text_blast/TextBlast";
import TransactionReports from "../views/transaction_reports/TransactionReports";
import UserStatus from "../views/user_status/UserStatus";
import UserVerification from "../views/user_verification/UserVerification";
import SupportUsers from "../views/support/users/SupportUsers";
import Deposits from "../views/accounting/deposits/Deposits";
import Withdrawals from "../views/accounting/withdrawals/Withdrawals";

const routeLinks = [
  {
    path: "/",
    element: <Home />,
    state: "Home.Home",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <HomeIcon />,
    },
  },
  // Administrative 1
  {
    path: "",
    element: <PageLayout />,
    state: "Administrative",
    sidebarProps: {
      displayText: "Administrative",
      icon: <CandlestickChartIcon />,
    },
    child: [
      {
        path: "/companies",
        element: <Company />,
        state: "Administrative.Company",
        sidebarProps: {
          displayText: "Company",
        },
      },
      {
        path: "/branches",
        element: <Branch />,
        state: "Administrative.Branch",
        sidebarProps: {
          displayText: "Branch",
        },
      },
      {
        path: "/roles",
        element: <Roles />,
        state: "Administrative.Roles",
        sidebarProps: {
          displayText: "Roles",
        },
      },
      {
        path: "/user/verification",
        element: <UserVerification />,
        state: "Administrative.UserVerification",
        sidebarProps: {
          displayText: "User Verification",
        },
      },
      {
        path: "/user/status",
        element: <UserStatus />,
        state: "Administrative.UserStatus",
        sidebarProps: {
          displayText: "User Status",
        },
      },
      {
        path: "/games",
        element: <UserStatus />,
        state: "Administrative.UserGames",
        sidebarProps: {
          displayText: "Games",
        },
      },
    ],
  },

  // User Accounts 2
  {
    path: "",
    element: <PageLayout />,
    state: "UserAccounts",
    sidebarProps: {
      displayText: "User Accounts",
      icon: <GroupsIcon />,
    },
    child: [
      {
        path: "/system/users",
        element: <SystemUsers />,
        state: "UserAccounts.SystemUsers",
        sidebarProps: {
          displayText: "System Users",
        },
      },
      {
        path: "/master/agents",
        element: <MasterAgents />,
        state: "UserAccounts.MasterAgents",
        sidebarProps: {
          displayText: "Master Agents",
        },
      },
      {
        path: "/agents",
        element: <Agents />,
        state: "UserAccounts.Agents",
        sidebarProps: {
          displayText: "Agents",
        },
      },
      {
        path: "/players",
        element: <Players />,
        state: "UserAccounts.Players",
        sidebarProps: {
          displayText: "Players",
        },
      },
      {
        path: "/user/approval",
        element: <Players />,
        state: "UserAccounts.UserApproval",
        sidebarProps: {
          displayText: "User Approval",
        },
      },
    ],
  },

  // Game 3
  {
    path: "",
    element: <PageLayout />,
    state: "Game",
    sidebarProps: {
      displayText: "Game",
      icon: <VideogameAssetIcon />,
    },
    child: [
      {
        path: "/schedule/settings",
        element: <ScheduleSettings />,
        state: "Game.ScheduleSettings",
        sidebarProps: {
          displayText: "Schedule Settings",
        },
      },
      {
        path: "/mechanics/settings",
        element: <MechanicsSettings />,
        state: "Game.MechanicsSettings",
        sidebarProps: {
          displayText: "Mechanics Settings",
        },
      },
      {
        path: "/store/settings",
        element: <StoreSettings />,
        state: "Game.StoreSettings",
        sidebarProps: {
          displayText: "Store Settings",
        },
      },
      {
        path: "/game/promotions",
        element: <Promotions />,
        state: "Game.Promotions",
        sidebarProps: {
          displayText: "Promotions",
        },
      },
      {
        path: "/game/bets",
        element: <Bets />,
        state: "Game.Bets",
        sidebarProps: {
          displayText: "Bets",
        },
      },
      {
        path: "/game/results",
        element: <GameResults />,
        state: "Game.Results",
        sidebarProps: {
          displayText: "Game Results",
        },
      },
      {
        path: "/game/prizes",
        element: <GamePrizes />,
        state: "Game.GamePrizes",
        sidebarProps: {
          displayText: "Game Prizes",
        },
      },
    ],
  },

  // Posts 4
  {
    path: "",
    element: <PageLayout />,
    state: "Posts",
    sidebarProps: {
      displayText: "Posts",
      icon: <TextSnippetIcon />,
    },
    child: [
      {
        path: "/text/blast",
        element: <TextBlast />,
        state: "Posts.TextBlast",
        sidebarProps: {
          displayText: "Text Blast",
        },
      },
      {
        path: "/announcements",
        element: <Annoucements />,
        state: "Posts.Announcements",
        sidebarProps: {
          displayText: "Announcements",
        },
      },
      {
        path: "/livestream",
        element: <Annoucements />,
        state: "Posts.Livestream",
        sidebarProps: {
          displayText: "Livestream",
        },
      },
    ],
  },

  // Reports 5
  {
    path: "",
    element: <PageLayout />,
    state: "Reports",
    sidebarProps: {
      displayText: "Reports",
      icon: <SettingsIcon />,
    },
    child: [
      {
        path: "/reports/revenue",
        element: <Revenue />,
        state: "Reports.Revenue",
        sidebarProps: {
          displayText: "Revenue",
        },
      },
      {
        path: "/reports/transactions",
        element: <TransactionReports />,
        state: "Reports.Transaction",
        sidebarProps: {
          displayText: "Transactions",
        },
      },
      {
        path: "/reports/performance",
        element: <Performance />,
        state: "Reports.Performance",
        sidebarProps: {
          displayText: "Performance",
        },
      },
      {
        path: "/reports/ativities",
        element: <ActivityReports />,
        state: "Reports.Activity",
        sidebarProps: {
          displayText: "Activity",
        },
      },
      {
        path: "/reports/growth",
        element: <Growth />,
        state: "Reports.Growth",
        sidebarProps: {
          displayText: "Growth",
        },
      },
    ],
  },

  // System 6
  {
    path: "",
    element: <PageLayout />,
    state: "System",
    sidebarProps: {
      displayText: "System",
      icon: <DesktopMacIcon />,
    },
    child: [
      {
        path: "/system/issues",
        element: <ReportAnIssue />,
        state: "System.ReportAnIssue",
        sidebarProps: {
          displayText: "Report An Issue",
        },
      },
      {
        path: "/system/terms",
        element: <Terms />,
        state: "System.TermsOfUse",
        sidebarProps: {
          displayText: "Terms Of Use",
        },
      },
      {
        path: "/system/privacy-policy",
        element: <PrivacyPolicy />,
        state: "System.PrivacyPolicy",
        sidebarProps: {
          displayText: "Privacy Policy",
        },
      },
      {
        path: "/system/aboutus",
        element: <AboutUs />,
        state: "System.AboutUs",
        sidebarProps: {
          displayText: "About Us",
        },
      },
    ],
  },

  // Accounting
  {
    path: "/deposits",
    element: <Deposits />,
    state: "Accounting.Deposits",
    sidebarProps: {
      displayText: "Deposits",
      icon: <MonetizationOnIcon />,
    },
  },
  {
    path: "/withdrawals",
    element: <Withdrawals />,
    state: "Accounting.Withdrawals",
    sidebarProps: {
      displayText: "Withdrawals",
      icon: <CreditCardIcon />,
    },
  },
  {
    path: "/bets",
    element: <Home />,
    state: "Accounting.Bets",
    sidebarProps: {
      displayText: "Bets",
      icon: <VideogameAssetIcon />,
    },
  },
  {
    path: "/assets",
    element: <Home />,
    state: "Accounting.Assets",
    sidebarProps: {
      displayText: "Assets",
      icon: <EqualizerIcon />,
    },
  },
  {
    path: "/wallet/settings",
    element: <Home />,
    state: "Accounting.WalletSettings",
    sidebarProps: {
      displayText: "Wallet Settings",
      icon: <WalletIcon />,
    },
  },
  {
    path: "/report/issue",
    element: <Home />,
    state: "Accounting.ReportAnIssue",
    sidebarProps: {
      displayText: "Report An Issue",
      icon: <ReportProblemIcon />,
    },
  },

  // Support
  {
    path: "/tickets",
    element: <Home />,
    state: "Support.Tickets",
    sidebarProps: {
      displayText: "Tickets",
      icon: <ConfirmationNumberIcon />,
    },
  },
  {
    path: "/livechat",
    element: <Home />,
    state: "Support.LiveChat",
    sidebarProps: {
      displayText: "Live Chat",
      icon: <ChatIcon />,
    },
  },
  {
    path: "/behavior",
    element: <Home />,
    state: "Support.Behavior",
    sidebarProps: {
      displayText: "Behavior",
      icon: <PsychologyIcon />,
    },
  },
  {
    path: "/support/users",
    element: <SupportUsers />,
    state: "Support.Users",
    sidebarProps: {
      displayText: "Users",
      icon: <GroupsIcon />,
    },
  },
  {
    path: "/faqs",
    element: <Home />,
    state: "Support.FAQs",
    sidebarProps: {
      displayText: "FAQs",
      icon: <LiveHelpIcon />,
    },
  },
];
export default routeLinks;
