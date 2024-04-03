import HomeIcon from '@mui/icons-material/Home';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const NavIcon = ({ sideBarSate }) => {
    switch (sideBarSate) {
        case "Home.Home":
            return <HomeIcon />
        case "Commission.Commission":
            return <PercentRoundedIcon />
        case "Gross.Gross":
            return <PaidIcon />
        case "Downline.Downline":
            return <PeopleAltIcon />
        case "Performance.Performance":
            return <EqualizerIcon />
        case "Transactions.Transactions":
            return <ReceiptIcon />
        case "Support.Support":
            return <ReportProblemIcon />
        default:
            return <HomeIcon />
    }
}

export default NavIcon