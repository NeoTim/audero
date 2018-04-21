import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const PullQuote = ({ author, picture, quote }) => (
   <blockquote className="pull-quote">
      <img
         className="testimonial__photo testimonial__photo--circle"
         src={picture}
         alt=""
      />
      <ReactMarkdown className="pull-quote__text" source={quote} />
      <footer className="pull-quote__details">
         <ReactMarkdown source={author} />
      </footer>
   </blockquote>
);

PullQuote.propTypes = {
   author: PropTypes.string.isRequired,
   picture: PropTypes.string.isRequired,
   quote: PropTypes.string.isRequired
};

export default PullQuote;
