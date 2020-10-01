import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Headroom from 'headroom.js';

import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  /*
  useEffect(() => {
    const headroom = new Headroom(document.getElementById('navbar-main'), { classes: { initial: 'navbar-light bg-light navbar-transparent', unpinned: 'navbar-dark bg-dark', pinned: 'navbar-light bg-light navbar-transparent' } });
    headroom.init();
  }, []);
  */

  return (
    <div>
      <Navbar
        expand="md"
        fixed="top"
        id="navbar-main"
        dark
        color="dark"
      >
        <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
          <FormattedMessage id="Navigation.Home" />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem onClick={close}>
              <Link to="/" className="nav-link">
                <FormattedMessage id="Navigation.Home" />
              </Link>
            </NavItem>

            <NavItem tag={Link} to="/booking" onClick={close}>
              <Link to="/booking" className="nav-link">
                <FormattedMessage id="Navigation.Booking" />
              </Link>
            </NavItem>

            <NavItem tag={Link} to="/booking" onClick={close}>
              <Link to="/play" className="nav-link">
                <FormattedMessage id="Navigation.Play" />
              </Link>
            </NavItem>

            <UncontrolledDropdown nav inNavbar color="dark" className="bg-dark">
              <DropdownToggle nav caret>
                <FormattedMessage id="Navigation.Language" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <FormattedMessage id="Navigation.Languages.DE-CH" onClick={close} />
                </DropdownItem>
                <DropdownItem>
                  <FormattedMessage id="Navigation.Languages.DE-DE" onClick={close} />
                </DropdownItem>
                <DropdownItem>
                  <FormattedMessage id="Navigation.Languages.FR-CH" onClick={close} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

Navigation.propTypes = {

};

Navigation.defaultProps = {

};

export default Navigation;
