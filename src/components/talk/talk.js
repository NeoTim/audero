import Link from '../link';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import TechnologyTag from '../technology-tag/technology-tag';

import styles from './talk.module.scss';

const renderTags = tags => (
   <ul
      className="list-inline my-3 text-truncate"
      style={{ color: 'transparent' }}
   >
      {tags.sort().map(tag => (
         <li className="list-inline-item mr-3" key={tag}>
            <TechnologyTag name={tag} />
         </li>
      ))}
   </ul>
);

const renderSlidesButton = url => (
   <Link className="btn btn-primary" to={url}>
      View slides
   </Link>
);

const renderVideoButton = url => (
   <Link className="btn btn-outline-secondary mt-2 mt-sm-0 ml-sm-2" to={url}>
      View video
   </Link>
);

const renderEvents = event => (
   <div>
      <Link to={event.website}>{event.name}</Link>
      {`, ${event.location}, `}
      <time dateTime={event.date}>
         {new Date(event.date).toLocaleDateString()}
      </time>
   </div>
);

const Talk = ({ className, description, givenAt, tags, title }) => (
   <article className={`${styles.talk} ${className || ''}`}>
      <h4 className={styles.talkTitle}>{title}</h4>
      {renderTags(tags)}
      <ReactMarkdown source={description} />

      <div className="d-flex flex-column flex-sm-row my-3">
         {givenAt[0].slidesUrl
            ? renderSlidesButton(givenAt[0].slidesUrl)
            : null}

         {givenAt[0].videoUrl ? renderVideoButton(givenAt[0].videoUrl) : null}
      </div>

      <section>
         <h5>Presentation given at</h5>
         <ul>
            {givenAt.map((event, index) => (
               <li key={index}>{renderEvents(event)}</li>
            ))}
         </ul>
      </section>
   </article>
);

Talk.propTypes = {
   className: PropTypes.string,
   description: PropTypes.string.isRequired,
   givenAt: PropTypes.array.isRequired,
   tags: PropTypes.arrayOf(PropTypes.string).isRequired,
   title: PropTypes.string.isRequired
};

export default Talk;
