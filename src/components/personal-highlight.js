import PageIcon from './page-icon/page-icon';
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const PersonalHighlight = ({ description, icon, title }) => (
   <section className="media flex-column flex-sm-row">
      <div className="mb-2 mb-sm-0 mr-sm-3">
         <PageIcon type={icon} />
      </div>
      <div className="media-body">
         <h2 className="h4">{title}</h2>
         <ReactMarkdown source={description} />
      </div>
   </section>
);

PersonalHighlight.propTypes = {
   description: PropTypes.string.isRequired,
   icon: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired
};

export default PersonalHighlight;
