import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Logo from '../logo'

const page = ()=>{
return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand>
            <Logo width={36} height={36}/>
            <p className="font-bold text-inherit">Bookquest</p>
        </NavbarBrand>
        <NavbarContent justify="end">
            <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
                Login
            </Button>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="primary" href="./register" variant="solid">
                Register
            </Button>
            </NavbarItem>
        </NavbarContent>
        </Navbar>
    )
}

export default  page;