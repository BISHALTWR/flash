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
    <Navbar shouldHideOnScroll className="text-white bg-primary-600">
        <NavbarBrand as={Link} href="/">
            <FaCode color="white"/>
            <p className="font-bold text-white">{" "}Flash</p>
        </NavbarBrand>
        <NavbarContent justify="center" >
          <h1 className="font-bold text-white uppercase">{props.navbarText}</h1>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem>
            <Button as={Link} color="primary" href="./login" variant="flat" style={(props.hideLogin||isLoggedIn)?{display: "none"}:{}}>
                Login
            </Button>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="primary" href="./register" variant="solid" style={(props.hideRegister||isLoggedIn)?{display: "none"}:{}}>
                Register
            </Button>
            </NavbarItem>
        </NavbarContent>
        <div className={`flex items-center gap-4 ${isLoggedIn ? '' : 'hidden'}`}>      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src={`https://i.pravatar.cc/150?u=${isLoggedIn?userDetails.username.charAt(0):"b"}`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="bordered">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Logged in as</p>
              <p className="font-semibold">{userDetails.email}</p>
            </DropdownItem>
            <DropdownItem key="my_codes" className="text-normal" as={Link} href="/code">
              My Codes
            </DropdownItem>
            <DropdownItem key="settings" className="text-normal" as={Link} href='/settings'>
              My Settings
            </DropdownItem>

            <DropdownItem key="logout" className="text-danger" onClick={()=>dispatch(logoutUser())}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
          </Dropdown>
      </div>
    </Navbar>
    )
}

export default  page;