import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Reserves from "./pages/Reserves/Reserves.jsx";
import Transactions from "./pages/Transactions/Transactions.jsx";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const routes = [
    {
        path: "/",
        element: <Dashboard/>,
        label: "Главная",
        Icon: SpaceDashboardIcon
    },
    {
        path: "/transactions",
        element: <Transactions/>,
        label: "Транзакции",
        Icon: ReceiptLongIcon
    },
    {
        path: "/reserves",
        element: <Reserves/>,
        label: "Резервы",
        Icon: ShoppingBagIcon
    }
]

export default routes;