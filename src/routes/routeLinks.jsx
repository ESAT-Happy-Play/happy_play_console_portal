import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import {Company, Branch, Roles, SystemUsers} from '../views';

import PageLayout from '../components/layout/PageLayout';
import AboutUs from '../views/about_us/AboutUs';
import ActivityReports from '../views/activity_reports/ActivityReports';
import Agents from '../views/agents/Agents';
import Annoucements from '../views/annoucements/Annoucements';
import Bets from '../views/bets/Bets';
import GamePrizes from '../views/game_prizes/GamePrizes';
import GameResults from '../views/game_results/GameResults';
import Games from '../views/games/Games';
import Growth from '../views/growth_reports/Growth';
import Home from '../views/home/Home';
import Livestream from '../views/livestream/Livestream';
import MasterAgents from '../views/master_agents/MasterAgents';
import MechanicsSettings from '../views/mechanics_settings/MechanicsSettings';
import Performance from '../views/performance_reports/Performance';
import Players from '../views/players/Players';
import PrivacyPolicy from '../views/privacy_policy/PrivacyPolicy';
import Promotions from '../views/promotions/Promotions';
import ReportAnIssue from '../views/report_an_issue/ReportAnIssue';
import Revenue from '../views/revenue_reports/Revenue';
import ScheduleSettings from '../views/schedule_settings/ScheduleSettings';
import StoreSettings from '../views/store_settings/StoreSettings';
import Terms from '../views/terms_of_use/Terms';
import TextBlast from '../views/text_blast/TextBlast';
import TransactionReports from '../views/transaction_reports/TransactionReports';
import UserStatus from '../views/user_status/UserStatus';
import UserVerification from '../views/user_verification/UserVerification';

const routeLinks = [
    {
      path: "/",
      element: <Home />,
      state: "Home.Home",
    },
    // Administrative 1
    {
      path: "",
      element: <PageLayout />,
      state: "Administrative",
      sidebarProps: {
        displayText: "Administrative",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/companies",
          element: <Company />,
          state: "Administrative.Company",
          sidebarProps: {
            displayText: "Company",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/branches",
          element: <Branch />,
          state: "Administrative.Branch",
          sidebarProps: {
            displayText: "Branch",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/roles",
          element: <Roles />,
          state: "Administrative.Roles",
          sidebarProps: {
            displayText: "Roles",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/user/verification",
          element: <UserVerification />,
          state: "Administrative.UserVerification",
          sidebarProps: {
            displayText: "User Verification",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/user/status",
          element: <UserStatus />,
          state: "Administrative.UserStatus",
          sidebarProps: {
            displayText: "User Status",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/games",
          element: <UserStatus />,
          state: "Administrative.UserGames",
          sidebarProps: {
            displayText: "Games",
            icon: <DashboardOutlinedIcon />
          }
        },
      ]
    },

    // User Accounts 2
    {
      path: "",
      element: <PageLayout />,
      state: "UserAccounts",
      sidebarProps: {
        displayText: "User Accounts",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/system/users",
          element: <SystemUsers />,
          state: "UserAccounts.SystemUsers",
          sidebarProps: {
            displayText: "System Users",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/master/agents",
          element: <MasterAgents />,
          state: "UserAccounts.MasterAgents",
          sidebarProps: {
            displayText: "Master Agents",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/agents",
          element: <Agents />,
          state: "UserAccounts.Agents",
          sidebarProps: {
            displayText: "Agents",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/players",
          element: <Players />,
          state: "UserAccounts.Players",
          sidebarProps: {
            displayText: "Players",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/user/approval",
          element: <Players />,
          state: "UserAccounts.UserApproval",
          sidebarProps: {
            displayText: "User Approval",
            icon: <DashboardOutlinedIcon />
          }
        }
      ]
    },

    // Game 3
    {
      path: "",
      element: <PageLayout />,
      state: "Game",
      sidebarProps: {
        displayText: "Game",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/schedule/settings",
          element: <ScheduleSettings />,
          state: "Game.ScheduleSettings",
          sidebarProps: {
            displayText: "Schedule Settings",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/mechanics/settings",
          element: <MechanicsSettings />,
          state: "Game.MechanicsSettings",
          sidebarProps: {
            displayText: "Mechanics Settings",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/store/settings",
          element: <StoreSettings />,
          state: "Game.StoreSettings",
          sidebarProps: {
            displayText: "Store Settings",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/promotions",
          element: <Promotions />,
          state: "Game.Promotions",
          sidebarProps: {
            displayText: "Promotions",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/bets",
          element: <Bets />,
          state: "Game.Bets",
          sidebarProps: {
            displayText: "Bets",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/game/results",
          element: <GameResults />,
          state: "Game.Results",
          sidebarProps: {
            displayText: "Game Results",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/game/prizes",
          element: <GamePrizes />,
          state: "Game.GamePrizes",
          sidebarProps: {
            displayText: "Game Prizes",
            icon: <DashboardOutlinedIcon />
          }
        },
      ]
    },

    // Posts 4
    {
      path: "",
      element: <PageLayout />,
      state: "Posts",
      sidebarProps: {
        displayText: "Posts",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/text/blast",
          element: <TextBlast />,
          state: "Posts.TextBlast",
          sidebarProps: {
            displayText: "Text Blast",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/announcements",
          element: <Annoucements />,
          state: "Posts.Announcements",
          sidebarProps: {
            displayText: "Announcements",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/livestream",
          element: <Annoucements />,
          state: "Posts.Livestream",
          sidebarProps: {
            displayText: "Livestream",
            icon: <DashboardOutlinedIcon />
          }
        },
      ]
    },

    // Reports 5
    {
      path: "",
      element: <PageLayout />,
      state: "Reports",
      sidebarProps: {
        displayText: "Reports",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/reports/revenue",
          element: <Revenue />,
          state: "Reports.Revenue",
          sidebarProps: {
            displayText: "Revenue",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/reports/transactions",
          element: <TransactionReports />,
          state: "Reports.Transaction",
          sidebarProps: {
            displayText: "Transactions",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/reports/performance",
          element: <Performance />,
          state: "Reports.Performance",
          sidebarProps: {
            displayText: "Performance",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/reports/ativities",
          element: <ActivityReports />,
          state: "Reports.Activity",
          sidebarProps: {
            displayText: "Activity",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/reports/growth",
          element: <Growth />,
          state: "Reports.Growth",
          sidebarProps: {
            displayText: "Growth",
            icon: <DashboardOutlinedIcon />
          }
        },
      ]
    },

    // System 6
    {
      path: "",
      element: <PageLayout />,
      state: "System",
      sidebarProps: {
        displayText: "System",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/system/issues",
          element: <ReportAnIssue />,
          state: "System.ReportAnIssue",
          sidebarProps: {
            displayText: "Report An Issue",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/system/terms",
          element: <Terms />,
          state: "System.TermsOfUse",
          sidebarProps: {
            displayText: "Terms Of Use",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/system/privacy-policy",
          element: <PrivacyPolicy />,
          state: "System.PrivacyPolicy",
          sidebarProps: {
            displayText: "Privacy Policy",
            icon: <DashboardOutlinedIcon />
          }
        },
        {
          path: "/system/aboutus",
          element: <AboutUs />,
          state: "System.AboutUs",
          sidebarProps: {
            displayText: "About Us",
            icon: <DashboardOutlinedIcon />
          }
        },
      ]
    }
  ];
export default routeLinks;