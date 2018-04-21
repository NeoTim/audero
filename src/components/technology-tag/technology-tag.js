import React from 'react';
import PropTypes from 'prop-types';

import styles from './technology-tag.module.scss';

const getClassName = name => styles[`tag-${name.toLowerCase()}`] || '';

const TechnologyTag = ({ name }) => (
   <span className={`${styles.tag} ${getClassName(name)}`}>{name}</span>
);

TechnologyTag.propTypes = {
   name: PropTypes.string.isRequired
};

export default TechnologyTag;
