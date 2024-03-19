import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { Home, Commission, Downline, Gross, Performance, Support, Transactions } from '../views';
 
const routeLinks = [
    {
      path: "/",
      element: <Home />,
      state: "Home.Home",
      sidebarProps: {
        displayText: "Dashboard",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/commission",
      element: <Commission />,
      state: "Commission.Commission",
      sidebarProps: {
        displayText: "Commission",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/gross",
      element: <Gross />,
      state: "Gross.Gross",
      sidebarProps: {
        displayText: "Gross",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/downline",
      element: <Downline />,
      state: "Downline.Downline",
      sidebarProps: {
        displayText: "Downline",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/performance",
      element: <Performance />,
      state: "Performance.Performance",
      sidebarProps: {
        displayText: "Performance",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/transactions",
      element: <Transactions />,
      state: "Transactions.Transactions",
      sidebarProps: {
        displayText: "Transactions",
        icon: <DashboardOutlinedIcon />
      },
    },
    {
      path: "/support",
      element: <Support />,
      state: "Support.Support",
      sidebarProps: {
        displayText: "Report A Problem",
        icon: <DashboardOutlinedIcon />
      },
    },
  ];
export default routeLinks;