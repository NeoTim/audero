import React from 'react';
import PropTypes from 'prop-types';
import PageIcon from './page-icon/page-icon';

const PageTitle = ({ iconType, title, ...others }) => (
   <div
      className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mt-4"
      {...others}
   >
      <PageIcon className="mr-sm-2" type={iconType} height={45} />
      <h2 className="media-body display-4">{title}</h2>
   </div>
);

PageTitle.propTypes = {
   iconType: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired
};

export default PageTitle;
