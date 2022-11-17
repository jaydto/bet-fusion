import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../../footer/footer";
import 'react-pro-sidebar/dist/css/styles.css';
import { faUser,  faQuestionCircle, faPrint, faHome,faStream,faInfo,faLaptop,faMagic} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const SidebarMobile = (props) => {
    // const [competitions, setCompetitions] = useState(getFromLocalStorage('categories'));
    const [user, setUser] = useState(getFromLocalStorage("user"));
    return (
        <ProSidebar
            className={'background-primary'}
            style={{width: "100%"}}
            image={false}>
            <SidebarHeader className={"background-primary"}>

                {user?<Menu>
                    <MenuItem >
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faUser}/>
                            <Link to={"/profile"}>User Profile</Link>
                        </div>

                    </MenuItem>
                </Menu>:""}

                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                        <Link to={"/how-to-play"}>How to play</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <Link to={"/print-matches"}>Print</Link>
                        </div>
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent className={"background-primary"} >

                <Menu >
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faHome}/>
                        <a href={"/"}>Home</a>
                        </div>
                        </MenuItem>

                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faStream}/>
                        <Link to={"/live"}>Live</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faLaptop}/>
                        <Link to={"/virtuals"}>Virtuals</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faMagic}/>
                        <Link to={"/promotions"}>Promotions</Link>
                        </div>
                        </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                        <FontAwesomeIcon icon={faInfo}/>
                        <Link to={"/livescore"}>Livescore</Link>
                        </div>
                    </MenuItem>
                </Menu>


            </SidebarContent>
            <SidebarFooter className={"background-primary"}>
                <Footer />
                {user? <Menu className={"logout-btn"}>
                    <MenuItem> <Link to={"/logout"}>Logout</Link> </MenuItem>
                </Menu>:""}
            </SidebarFooter>
        </ProSidebar>
    )
}

export default SidebarMobile