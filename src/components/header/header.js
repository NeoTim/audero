import Link from '../link';
import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby-link';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink
} from 'reactstrap';

import AuderoLogo from './audero-logo.png';

const ITEMS = {
   '/': 'Home',
   '/projects': 'Projects',
   '/books': 'Books',
   '/speaking': 'Speaking',
   '/publications': 'Publications',
   '/blog/': 'Blog'
};

class Header extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         collapsed: true
      };
   }

   render() {
      return (
         <div className="bg-light py-2">
            <div className="container">
               <Navbar light expand="sm">
                  <NavbarBrand tag={Link} to="/">
                     <img src={AuderoLogo} alt="Audero logo" height={40} />
                     <h1 className="sr-only">{this.props.siteTitle}</h1>
                  </NavbarBrand>
                  <NavbarToggler onClick={this._toggleNavbar} className="mr-2">
                     <span className="navbar-toggler-icon" />
                     <span className="sr-only">Main menu</span>
                  </NavbarToggler>
                  <Collapse isOpen={!this.state.collapsed} navbar>
                     <Nav navbar>
                        {Object.keys(ITEMS).map(href =>
                           this._renderMenuItem({
                              href: href,
                              isActive:
                                 this.props.currentPage === withPrefix(href),
                              text: ITEMS[href]
                           })
                        )}
                     </Nav>
                  </Collapse>
               </Navbar>
            </div>
         </div>
      );
   }

   _renderMenuItem = ({ href, isActive, text }) => {
      return (
         <NavItem key={href}>
            <NavLink
               className="text-primary"
               tag={Link}
               to={href}
               active={isActive}
               onClick={this._resetNavbar}
            >
               {text}
            </NavLink>
         </NavItem>
      );
   };

   _resetNavbar = () => {
      this.setState({
         collapsed: true
      });
   };

   _toggleNavbar = () => {
      this.setState({
         collapsed: !this.state.collapsed
      });
   };
}

Header.propTypes = {
   currentPage: PropTypes.string,
   siteTitle: PropTypes.string.isRequired
};

export default Header;
