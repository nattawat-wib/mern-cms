import { Link } from "react-router-dom";

import * as React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Container } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListIcon from '@mui/icons-material/List';

const Navbar = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[{ name: 'Home', url: "/" }, { name: 'Add Article', url: "/article/add" }, { name: 'All Article', url: "/article" }].map((text, index) => (
                    <ListItem button key={index} component={Link} to={text.url}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar className="justify-between">
                    <Link to={"/"} className="mb-0 fw-bold text-light text-decoration-none"> MERN CMS  </Link>
                    <Box>
                        <Button className="block md:hidden" variant="contained" color="primary" onClick={toggleDrawer("left", true)} >
                            <ListIcon />
                        </Button>

                        <List className="hidden md:flex whitespace-nowrap">
                            <ListItem>
                                <Button color="light" component={Link} to={"/"}> Home</Button>
                            </ListItem>
                            <ListItem>
                                <Button color="light" component={Link} to={"/article"}> all article </Button>
                            </ListItem>
                            <ListItem>
                                <Button color="light" component={Link} to={"/article/add"}> add article </Button>
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </Container>

            <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                {list("left")}
            </Drawer>
        </AppBar>

        // <nav className="d-flex justify-content-between align-items-center px-3 py-1 bg-info" key={"left"}>
        //     <Link to={"/"} className="mb-0 fw-bold text-light text-decoration-none"> <h1> MERN CMS </h1> </Link>
        //     <Button variant="contained" color="primary" startIcon={<ListIcon />} onClick={toggleDrawer("left", true)}> Menu </Button>
        //     <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
        //         {list("left")}
        //     </Drawer>
        // </nav>
    );
}

export default Navbar