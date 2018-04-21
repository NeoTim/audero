import Link from '../link';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './employer.module.scss';

const Employer = ({ logo, name, url, className, ...others }) => (
   <Link className={`d-inline-block ${styles.employer} ${className || ''}`} to={url} {...others}>
      <img
         src={logo}
         className={`mw-100 ${styles.employerLogo}`}
         alt={`${name} logo`}
      />
   </Link>
);

Employer.propTypes = {
   logo: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   url: PropTypes.string.isRequired
};

export default Employer;
