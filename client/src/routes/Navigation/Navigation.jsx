import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from "../routes.jsx";

import styles from './Navigation.module.scss';
import {Link, useLocation} from "react-router-dom";

const Navigation = () => {
    const location = useLocation();

    return (
        <div className={styles.main_nav}>
            <List disablePadding>
                {routes.map(({path, label, Icon}) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link to={path} key={path}>
                            <ListItem disablePadding>
                                <ListItemButton url={path}>
                                    <ListItemIcon>
                                        <Icon sx={{fill: isActive ? "#4872fb" : "#FFFFFF"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={label} sx={{color: isActive ? "#4872fb" : "#FFFFFF"}}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        </div>
    )
}

export default Navigation;