import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from './link';

const renderIcon = (src, name) => (
   <img
      src={src}
      className="img-fluid"
      alt={`Icon of ${name}`}
      height={64}
      width={64}
   />
);

const Project = ({ description, icon, name, url }) => (
   <div>
      {icon ? renderIcon(icon, name) : null}
      <h4 className="mt-2">
         <Link to={url}>{name}</Link>
      </h4>
      <ReactMarkdown source={description} />
   </div>
);

Project.propTypes = {
   description: PropTypes.string.isRequired,
   icon: PropTypes.string,
   name: PropTypes.string.isRequired,
   url: PropTypes.string.isRequired
};

export default Project;
