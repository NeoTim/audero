import React from 'react';
import PropTypes from 'prop-types';
import Link from '../link';

import DocumentIcon from './paper-document.svg';

const Publication = ({ reference, title, url, year }) => (
   <div className="media flex-column flex-sm-row">
      <div>
         <img
            src={DocumentIcon}
            className="mb-2 mb-sm-0 mr-sm-3"
            alt=""
            width={64}
         />
      </div>
      <div className="media-body">
         <h4 className="h5">{url ? <Link to={url}>{title}</Link> : title}</h4>
         <p className="small">{reference}</p>
      </div>
   </div>
);

Publication.propTypes = {
   reference: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   url: PropTypes.string,
   year: PropTypes.number
};

export default Publication;
