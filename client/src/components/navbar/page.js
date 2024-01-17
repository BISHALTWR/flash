import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Logo from '../logo'

const page = (props)=>{
return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand as={Link} href="./">
            <Logo width={36} height={36}/>
            <p className="font-bold text-inherit">Bookquest</p>
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
        </Navbar>
    )
}

export default  page;