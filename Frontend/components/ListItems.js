import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import WineBarIcon from '@mui/icons-material/WineBar';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PageContext } from "../contexts/PageContext";

const ListItems = () => {
    const { setPageName } = useContext(PageContext)

    const router = useRouter()
    const switchPage = (pageName) => {
        if (pageName === "home") {
            setPageName("dashboard")
            router.replace("/")
        } else {
            setPageName(pageName)
            router.replace(pageName)
        }
    }

    return (
        <>
            <ListItemButton onClick={() => switchPage("home")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => switchPage("orders")}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton onClick={() => switchPage("customers")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItemButton>
            <ListItemButton onClick={() => switchPage("products")}>
                <ListItemIcon>
                    <WineBarIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton onClick={() => switchPage("suppliers")}>
                <ListItemIcon>
                    <AgricultureIcon />
                </ListItemIcon>
                <ListItemText primary="Suppliers" />
            </ListItemButton>
            <ListItemButton onClick={() => switchPage("ingredients")}>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Ingredients" />
            </ListItemButton>
        </>
    )
}

export default ListItems