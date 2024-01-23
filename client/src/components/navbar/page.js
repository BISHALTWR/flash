'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { FaCode } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '@/redux/reducerSlices/userSlice'
// const loggedInConfig = {
//     true : [],
//     false : []
// }

const page = (props)=>{
    const dispatch = useDispatch();
    const {isLoggedIn, userDetails} = useSelector(state => state.user)
return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand as={Link} href="/">
            <FaCode/>
            <p className="font-bold text-inherit">{" "}Flash</p>
        </NavbarBrand>
        <NavbarContent justify="end">
            <NavbarItem>
            <Button as={Link} color="primary" href="./login" variant="flat" style={props.hideLogin?{display: "none"}:{}}>
                Login
            </Button>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="primary" href="./register" variant="solid" style={props.hideRegister?{display: "none"}:{}}>
                Register
            </Button>
            </NavbarItem>
        </NavbarContent>
        <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userDetails.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={()=>dispatch(logoutUser())}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    </Navbar>
    )
}

export default  page;