import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from "../routes.jsx";

import styles from './Navigation.module.scss';
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <div className={styles.main_nav}>
            <List disablePadding>
                {routes.map(({path, label, icon}) => {
                    return (
                        <Link to={path} key={path}>
                            <ListItem disablePadding>
                                <ListItemButton url={path}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={label}/>
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