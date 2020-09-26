import React, { Component } from 'react'
import { Navbar, NavbarBrand, Jumbotron, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">

                        <NavbarBrand className="mr-auto" href="/">
                            <img src="images/logo.png" height="40" width="61" alt="My Restaurant" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />

                        <Collapse isOpen={this.state.isNavOpen} navbar className="justify-content-center">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home" >
                                        <span className="fa fa-home fa-lg"></span>  Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus" >
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu" >
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus" >
                                        <span className="fa fa-address-card fa-lg"></span> Contact US
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>My Restaurant</h1>
                                <p>We take inspiration from the World's best cuisins, and create a unique food experience.
                                Our lipsmaking creation will trickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                
            </React.Fragment>
        )
    }
}

export default Header
