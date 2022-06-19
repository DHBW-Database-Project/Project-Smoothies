import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';


const SecondaryListItems = () => {
    return (
        <>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Complex queries" />
            </ListItemButton>
        </>
    )
}

export default SecondaryListItems