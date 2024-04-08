import HomeIcon from '@mui/icons-material/Home';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import { Home, Commission, Downline, Gross, Performance, Support, Transactions } from '../views';
 
const routeLinks = [
    {
      path: "/",
      element: <Home />,
      state: "Home.Home",
      sidebarProps: {
        displayText: "Dashboard",
        icon: <HomeIcon />
      },
    },
    {
      path: "/commission",
      element: <Commission />,
      state: "Commission.Commission",
      sidebarProps: {
        displayText: "Commission",
        icon: <PercentRoundedIcon />
      },
    },
    {
      path: "/gross",
      element: <Gross />,
      state: "Gross.Gross",
      sidebarProps: {
        displayText: "Gross",
        icon: <PaidIcon />
      },
    },
    {
      path: "/downline",
      element: <Downline />,
      state: "Downline.Downline",
      sidebarProps: {
        displayText: "Downline",
        icon: <PeopleAltIcon />
      },
    },
    // {
    //   path: "/performance",
    //   element: <Performance />,
    //   state: "Performance.Performance",
    //   sidebarProps: {
    //     displayText: "Performance",
    //     icon: <EqualizerIcon />
    //   },
    // },
    {
      path: "/transactions",
      element: <Transactions />,
      state: "Transactions.Transactions",
      sidebarProps: {
        displayText: "Transactions",
        icon: <ReceiptIcon />
      },
    },
    {
      path: "/support",
      element: <Support />,
      state: "Support.ReportAnIssue",
      sidebarProps: {
        displayText: "Report A Problem",
        icon: <ReportProblemIcon />
      },
    },
  ];
export default routeLinks;