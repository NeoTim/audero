import Link from './link';
import PropTypes from 'prop-types';
import PublisherIcon from './publisher-icon/publisher-icon';
import React from 'react';
import TechnologyTag from './technology-tag/technology-tag';

const Article = ({ date, publisher, publisherUrl, tags, title, url }) => {
   return (
      <div className="d-flex flex-column h-100">
         <Link to={publisherUrl}>
            <PublisherIcon
               type={publisher}
               className="img-fluid"
               width={64}
               height={64}
            />
         </Link>
         <h4 className="h5 mt-2">
            <Link to={url}>{title}</Link>
         </h4>
         <p className="mt-auto">
            {'Published the '}
            <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
         </p>
         <ul
            className="list-inline text-truncate"
            style={{ color: 'transparent' }}
         >
            {tags.sort().map(tag => (
               <li className="list-inline-item mr-3" key={tag}>
                  <TechnologyTag name={tag} />
               </li>
            ))}
         </ul>
      </div>
   );
};

Article.propTypes = {
   date: PropTypes.string.isRequired,
   publisher: PropTypes.string.isRequired,
   publisherUrl: PropTypes.string.isRequired,
   tags: PropTypes.arrayOf(PropTypes.string).isRequired,
   title: PropTypes.string.isRequired,
   url: PropTypes.string.isRequired
};

export default Article;
