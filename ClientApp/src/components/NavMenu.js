import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 bg-dark text-white" container light>
                <NavbarBrand tag={Link} className="text-white"  to="/customer-table">OnBoarding</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
             {/* <NavItem>
                <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
              </NavItem>*/}
              <NavItem>
                <NavLink tag={Link} className="text-white" to="/customer-table">Customers</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/product-table">Products</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/store-table">Stores</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/sale-table">Sales</NavLink>
                        </NavItem>
              {/*<NavItem>
                <NavLink tag={Link} className="text-white" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-white" to="/fetch-data">Fetch data</NavLink>
              </NavItem>*/}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
