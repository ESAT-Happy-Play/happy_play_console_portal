import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';

import SmsIcon from '@mui/icons-material/Sms';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

import Admin from '../pages/superadmin/admin/Admin';
import Branch from '../pages/superadmin/branch/Branch';
import Company from '../pages/superadmin/company/Company';
import Profile from '../pages/superadmin/profiles/Profile';
import SystemUser from '../pages/useraccounts/systemusers/SystemUser';
import Operator from '../pages/useraccounts/operators/Operator';
import MasterAgent from '../pages/useraccounts/masteragents/MasterAgent';
// import Agents from '../pages/useraccounts/agents/Agents';
// import Players from '../pages/useraccounts/players/Players';
import AdminAgents from '../pages/useraccounts/adminAgents/AdminAgents';
import AdminPlayers from '../pages/useraccounts/adminPlayers/AdminPlayers';
import ScheduleSetting from '../pages/games/schedulesettings/ScheduleSetting';
import MechanicsSetting from '../pages/games/mechanicssettings/MechanicsSetting';
import GameBets from '../pages/games/gameBets/GameBets';
import GameResults from '../pages/games/gameResults/GameResults';
import TextBlast from '../pages/postings/textblast/TextBlast';
import Announcement from '../pages/postings/announcements/Announcement';
import LiveStreaming from '../pages/postings/livestreaming/LiveStreaming';
import SalesReport from '../pages/reports/sales/SalesReport';
import TransactionReport from '../pages/reports/transactions/TransactionReport';
import PageLayout from '../components/layout/PageLayout';
import Prices from '../pages/games/prices/Prices';
import ProfileInfo from '../pages/profile/profileInfo/profileInfo';
import Resetpassword from '../pages/profile/resetpassword/resetpassword';
// import Wallet from '../pages/wallet/wallet/Wallet';
// import UserApproval from '../pages/useraccounts/userApproval/UserApproval';
import AdminGameResult from '../pages/games/adminGameResults/AdminGameResult';
import UserVerification from '../pages/useraccounts/userverification/UserVerification';
import Home from '../pages/home/Home';

import AgentHome from '../pages/console/home/AgentHome';
import AgentGameBets from '../pages/console/history/game_bets/AgentGameBets';
import AgentGameResults from '../pages/console/history/game_results/AgentGameResults';
import AgentWallet from '../pages/console/wallet/AgentWallet';
import AgentUserApproval from '../pages/console/user_accounts/user_approval/AgentUserApproval';
import AccountAgent from '../pages/console/user_accounts/agent/AccountAgent';
import AccountPlayer from '../pages/console/user_accounts/player/AccountPlayer';
import AgentSales from '../pages/console/reports/sales/AgentSales';
import AgentTransactions from '../pages/console/reports/transactions/AgentTransactions';
import AgentUserActivities from '../pages/console/reports/user_activities/AgentUserActivities';

import { GetStoreObject } from "../helper/Helpers";
import AdminGameBets from '../pages/games/adminGameBets/AdminGameBets';
import GameSimulator from '../pages/games/gameSimulator/GameSimulator';
import Game from '../pages/superadmin/games/Game';

let user_role = GetStoreObject("role");
var userRole = "Agent";

if(user_role !== null) {
  userRole = user_role.role;
}

const routeLinks = [
    // Home 1
    {
      path: "/",
      element: <AgentHome />,
      state: "Home.Home",
    },
    // Dashboard 0
    {
      path: "/",
      element: <Home />,
      state: "Admin.Dashboard"
    },
    // History 2
    {
      path: "",
      element: <PageLayout />,
      state: "History",
      sidebarProps: {
        displayText: "HISTORY",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/agent/history/gamebets",
          element: <AgentGameBets />,
          state: "History.GameBets",
          sidebarProps: {
            displayText: "Game Bets",
            icon: <PaymentsOutlinedIcon />
          },
        },
        {
          path: "/agent/history/gameresult",
          element: <AgentGameResults />,
          state: "History.GameResult",
          sidebarProps: {
            displayText: "Game Result",
            icon: <PostAddOutlinedIcon />
          },
        }
      ]
    },
    // Wallet 3
    {
      path: "",
      element: <PageLayout />,
      state: "Wallet",
      sidebarProps: {
        displayText: "WALLET",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/agent/wallet",
          element: <AgentWallet />,
          state: "Wallet.Wallet",
          sidebarProps: {
            displayText: "Wallet",
            icon: <WalletOutlinedIcon />
          },
        }
      ]
    },
    // Profile 4
    {
      path: "",
      element: <PageLayout />,
      state: "Profile",
      sidebarProps: {
        displayText: "PROFILE",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/profile/info",
          element: <ProfileInfo />,
          state: "Profile.ProfileInformation",
          sidebarProps: {
            displayText: "Profile Information",
            icon: <PersonIcon />
          },
        },
        {
          path: "/profile/reset",
          element: <Resetpassword />,
          state: "Profile.ResetPassword",
          sidebarProps: {
            displayText: "Reset Password",
            icon: <VisibilityOutlinedIcon />
          },
        },
      ]
    },
    // Super Admin 5
    {
      path: "",
      element: <PageLayout />,
      state: "SuperAdmin",
      sidebarProps: {
        displayText: "SUPER ADMIN",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/admin",
          element: <Admin/>,
          state: "SuperAdmin.SuperAdmin",
          sidebarProps: {
            displayText: "Super Admin",
            icon: <LockOutlinedIcon />
          },
        },
        {
          path: "/company",
          element: <Company />,
          state: "SuperAdmin.Company",
          sidebarProps: {
            displayText: "Company",
            icon: <ApartmentOutlinedIcon />
          },
        },
        {
          path: "/branch",
          element: <Branch />,
          state: "SuperAdmin.Branch",
          sidebarProps: {
            displayText: "Branch",
            icon: <HomeWorkOutlinedIcon />
          },
        },
        {
          path: "/profiles",
          element: <Profile />,
          state: "SuperAdmin.Profiles",
          sidebarProps: {
            displayText: "Profiles",
            icon: <AssignmentIndIcon />
          },
        },
        {
          path: "/games",
          element: <Game />,
          state: "SuperAdmin.Games",
          sidebarProps: {
            displayText: "Games",
            icon: <DashboardOutlinedIcon />
          },
        }
      ]
    },
    // User Account 6
    {
      path: "",
      element: <PageLayout />,
      state: "UserAccount",
      sidebarProps: {
        displayText: "USER ACCOUNTS",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/account/systemusers",
          element: <SystemUser />,
          state: "UserAccount.SystemUsers",
          sidebarProps: {
            displayText: "System Users",
            icon: <Diversity3OutlinedIcon />
          },
        },
        {
          path: "/account/operators",
          element: <Operator />,
          state: "UserAccount.Operators",
          sidebarProps: {
            displayText: "Operators",
            icon: <AccountCircleIcon />
          },
        },
        {
          path: "/agent/account/approval",
          element: <AgentUserApproval/>,
          state: "UserAccount.UserApproval",
          sidebarProps: {
            displayText: "User Approval",
            icon: <VerifiedOutlinedIcon />
          },
        },
        {
          path: "/account/verify",
          element: <UserVerification />,
          state: "UserAccount.UserVerification",
          sidebarProps: {
            displayText: "User Verification",
            icon: <VerifiedOutlinedIcon />
          },
        },
        {
          path: "/account/masteragents",
          element: <MasterAgent />,
          state: "UserAccount.MasterAgents",
          sidebarProps: {
            displayText: "Master Agents",
            icon: <PersonAddAltOutlinedIcon />
          },
        },

        {
          path: "/account/agents",
          element: (userRole === "Dashboard") ? <AdminAgents /> : <AccountAgent />,
          state: "UserAccount.Agents",
          sidebarProps: {
            displayText: "Agents",
            icon: <PeopleOutlinedIcon />
          },
        },
        {
          path: "/account/players",
          element: (userRole === "Dashboard") ? <AdminPlayers /> : <AccountPlayer />,
          state: "UserAccount.Players",
          sidebarProps: {
            displayText: "Players",
            icon: <PersonOutlineOutlinedIcon />
          },
        },

      ]
    },
    // Game 7
    {
      path: "",
      element: <PageLayout />,
      state: "Game",
      sidebarProps: {
        displayText: "GAME",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/game/schedulesettings",
          element: <ScheduleSetting />,
          state: "Game.GameScheduleSettings",
          sidebarProps: {
            displayText: "Game Schedule Settings",
            icon: <QueryBuilderOutlinedIcon />
          },
        },
        {
          path: "/game/mechanicssettings",
          element: <MechanicsSetting />,
          state: "Game.GameMechanicsSettings",
          sidebarProps: {
            displayText: "Game Mechanics Settings",
            icon: <SettingsOutlinedIcon />
          },
        },
        {
          path: "/game/prices",
          element: <Prices />,
          state: "Game.Price&Prizes",
          sidebarProps: {
            displayText: "Price & Prizes",
            icon: <MoneyOutlinedIcon />
          },
        },
        {
          path: "/game/gamebets",
          element: (userRole === "Dashboard") ? <AdminGameBets /> : <GameBets />,
          state: "Game.GameBets",
          sidebarProps: {
            displayText: "Game Bets",
            icon: <PaymentsOutlinedIcon />
          },
        },
        {
          path: "/game/gameresult",
          element: (userRole === "Dashboard") ? <AdminGameResult /> : <GameResults />,
          state: "Game.GameResult",
          sidebarProps: {
            displayText: "Game Result",
            icon: <PostAddOutlinedIcon />
          },
        },
        {
          path: "/game/simulator",
          element: <GameSimulator />,
          state: "Game.GameSimulator",
          sidebarProps: {
            displayText: "Game Simulator",
            icon: <PreviewOutlinedIcon />
          },
        },
      ]
    },
    // Postings 8
    {
      path: "",
      element: <PageLayout />,
      state: "Postings",
      sidebarProps: {
        displayText: "POSTINGS",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/textblast",
          element: <TextBlast />,
          state: "Postings.TextBlast",
          sidebarProps: {
            displayText: "Text Blast",
            icon: <SmsIcon />
          },
        },
        {
          path: "/announcements",
          element: <Announcement />,
          state: "Postings.Announcements",
          sidebarProps: {
            displayText: "Announcements",
            icon: <CampaignOutlinedIcon />
          },
        },
        {
          path: "/livestreaming",
          element: <LiveStreaming />,
          state: "Postings.LiveStreaming",
          sidebarProps: {
            displayText: "Livestreaming",
            icon: <LiveTvOutlinedIcon />
          },
        },
      ]
    },
    // Reporting 9
    {
      path: "",
      element: <PageLayout />,
      state: "Reporting",
      sidebarProps: {
        displayText: "REPORTING",
        icon: <DashboardOutlinedIcon />
      },
      child: [
        {
          path: "/sales/report",
          element: (userRole === "Dashboard") ?  <SalesReport /> : <AgentSales />,
          state: "Reporting.SalesReport",
          sidebarProps: {
            displayText: "Sales Report",
            icon: <MonetizationOnIcon />
          },
        },
        {
          path: "/transactions/report",
          element: (userRole === "Dashboard") ? <TransactionReport /> : <AgentTransactions />,
          state: "Reporting.TransactionReport",
          sidebarProps: {
            displayText: "Transaction Report",
            icon: <PointOfSaleIcon />
          },
        },
        {
          path: "/activity/report",
          element: (userRole === "Admin") ? <Admin/> : <AgentUserActivities/>,
          state: "Reporting.UserActivityReport",
          sidebarProps: {
            displayText: "User Activity Report",
            icon: <AcUnitOutlinedIcon />
          },
        },
        {
          path: "/activity/report",
          element: (userRole === "Dashboard") ? <Admin/> : <AgentUserActivities/>,
          state: "Reporting.UserGrowth",
          sidebarProps: {
            displayText: "User Growth",
            icon: <AcUnitOutlinedIcon />
          },
        }
      ]
    }
  ];

export default routeLinks;