import HomeIcon from '@mui/icons-material/Home';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import GroupsIcon from '@mui/icons-material/Groups';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SettingsIcon from '@mui/icons-material/Settings';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChatIcon from '@mui/icons-material/Chat';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PsychologyIcon from '@mui/icons-material/Psychology';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import WalletIcon from '@mui/icons-material/Wallet';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const NavIcon = ({ sideBarSate }) => {
    switch (sideBarSate) {
        case "Home.Home":
            return <HomeIcon />
        case "Accounting.Deposits":
            return <MonetizationOnIcon />
        case "Accounting.Withdrawals":
            return <CreditCardIcon />
        case "Accounting.Bets":
            return <VideogameAssetIcon />
        case "Accounting.Assets":
            return <EqualizerIcon />
        case "Accounting.WalletSettings":
            return <WalletIcon />
        case "Accounting.ReportAnIssue":
            return <ReportProblemIcon />
        case "Support.Tickets":
            return <ConfirmationNumberIcon />
        case "Support.Behavior":
            return <PsychologyIcon />
        case "Support.Users":
            return <GroupsIcon />
        case "Support.FAQs":
            return <LiveHelpIcon />
        case "Notifications.Notifications":
            return <NotificationsIcon />
        case "Profile.Profile":
            return <AccountCircleRoundedIcon />
        default:
            return <SettingsApplicationsIcon />
    }
}

export default NavIcon