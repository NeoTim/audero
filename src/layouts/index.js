import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import './main.scss';

const Layout = ({ children, data, location }) => (
   <div>
      <Helmet htmlAttributes={{ lang: 'en-US' }}>
         <title>{data.site.siteMetadata.title}</title>
         <meta
            name="description"
            content="The website of Aurelio De Rosa, a full-stack Web developer, jQuery team member, author, and speaker"
         />
         <link rel="icon" href={withPrefix('/images/favicon.ico')} />
         <link rel="apple-touch-icon" href={withPrefix('/images/audero-logo.png')} />
         <meta name="theme-color" content="#F8F9FA" />
         <meta
            name="google-site-verification"
            content="ismb3XGlL6apIUwFNBQSKLNEqz5BAPqEZFZWXy1uUGM"
         />
      </Helmet>
      <Header
         siteTitle={data.site.siteMetadata.title}
         currentPage={location.pathname}
      />
      {children()}
      <Footer />
   </div>
);

Layout.propTypes = {
   children: PropTypes.func
};

export default Layout;

export const query = graphql`
   query SiteTitleQuery {
      site {
         siteMetadata {
            title
         }
      }
   }
`;
