import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';

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

import SmsIcon from '@mui/icons-material/Sms';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

const NavIcon = ({ sideBarSate }) => {
  switch(sideBarSate) {
    case "Home.Home":
        return <DashboardOutlinedIcon />
    case "Admin.Dashboard":
        return <DashboardOutlinedIcon />

    case "History.GameBets":
        return <PaymentsOutlinedIcon />
    case "History.GameResult":
        return <PostAddOutlinedIcon />

    case "Wallet.Wallet":
        return <WalletOutlinedIcon />

    case "Profile.ProfileInformation":
        return <PersonIcon />
    case "Profile.ResetPassword":
        return <VisibilityOutlinedIcon />

    case "SuperAdmin.SuperAdmin":
        return <LockOutlinedIcon />
    case "SuperAdmin.Company":
        return <ApartmentOutlinedIcon />
    case "SuperAdmin.Branch":
        return <HomeWorkOutlinedIcon />
    case "SuperAdmin.Profiles":
        return <AssignmentIndIcon />

    case "UserAccount.SystemUsers":
        return <Diversity3OutlinedIcon />
    case "UserAccount.Operators":
        return <AccountCircleIcon />
    case "UserAccount.UserApproval":
        return <VerifiedOutlinedIcon />
    case "UserAccount.UserVerification":
        return <VerifiedOutlinedIcon />
    case "UserAccount.MasterAgents":
        return <PersonAddAltOutlinedIcon />
    case "UserAccount.Agents":
        return <PeopleOutlinedIcon />
    case "UserAccount.Players":
        return <PersonOutlineOutlinedIcon />

    case "Game.GameScheduleSettings":
        return <QueryBuilderOutlinedIcon />
    case "Game.GameMechanicsSettings":
        return <SettingsOutlinedIcon />
    case "Game.Price&Prizes":
        return <MoneyOutlinedIcon />
    case "Game.GameBets":
        return <PaymentsOutlinedIcon />
    case "Game.GameResult":
        return <PostAddOutlinedIcon />

    case "Postings.TextBlast":
        return <SmsIcon />
    case "Postings.Announcements":
        return <CampaignOutlinedIcon />
    case "Postings.LiveStreaming":
        return <LiveTvOutlinedIcon />

    case "Reporting.SalesReport":
        return <MonetizationOnIcon />
    case "Reporting.TransactionReport":
        return <PointOfSaleIcon />
    case "Reporting.UserActivityReport":
        return <AcUnitOutlinedIcon />
    default:
        return <DashboardOutlinedIcon />
  }
}

export default NavIcon