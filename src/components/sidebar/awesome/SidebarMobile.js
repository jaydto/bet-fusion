import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../../footer/footer";

const SidebarMobile = (props) => {
    const [competitions, setCompetitions] = useState(getFromLocalStorage('categories'));
    const [user, setUser] = useState(getFromLocalStorage("user"));
    return (
        <ProSidebar
            className={'background-primary'}
            style={{width: "100%"}}
            image={false}>
            <SidebarHeader className={"background-primary"}>
                {user? <Menu>
                    <MenuItem> <Link to={"/logout"}>Logout</Link> </MenuItem>
                </Menu>:""}
                {user?<Menu>
                    <MenuItem>User Profile</MenuItem>
                </Menu>:""}

                <Menu>
                    <MenuItem><Link to={"how-to-play"}>How to play</Link></MenuItem>
                </Menu>
                <Menu>
                    <MenuItem><Link to={"/print-matches"}>Print</Link></MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent className={"background-primary"} >

                <Menu >
                    <MenuItem><a href={"/"}>Home</a> </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem><Link to={"/live"}>Live</Link></MenuItem>
                </Menu>
                <Menu>
                    <MenuItem><Link to={"/virtuals"}>Virtuals</Link></MenuItem>
                </Menu>
                <Menu>
                    <MenuItem><Link to={"/promotions"}>Promotions</Link></MenuItem>
                </Menu>
                <Menu>
                    <MenuItem><Link to={"/livescore"}>Livescore</Link></MenuItem>
                </Menu>


            </SidebarContent>
            <SidebarFooter className={"background-primary"}>
                <Footer />
            </SidebarFooter>
        </ProSidebar>
    )
}

export default SidebarMobile