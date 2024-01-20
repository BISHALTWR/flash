import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { FaCode } from "react-icons/fa";

const page = (props)=>{
return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand as={Link} href="./">
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
        </Navbar>
    )
}

export default  page;