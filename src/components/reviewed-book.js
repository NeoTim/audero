import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from './link';

const renderCover = (url, cover, title) => (
   <Link to={url} className="media-object" tabIndex="-1">
      <img
         alt={`Cover of ${title}`}
         className="border"
         height={166}
         itemProp="image"
         src={cover}
      />
   </Link>
);

const ReviewedBook = ({ ...book }) => {
   const cover = book.cover
      ? renderCover(book.url, book.cover, book.title)
      : null;
   const content = (
      <div>
         <h4 className="media-heading" itemProp="name">
            <Link to={book.url}>{book.title}</Link>
         </h4>
         <div className="small" itemProp="description">
            <ReactMarkdown source={book.description} />
         </div>
         <dl hidden>
            <dt>Author</dt>
            <dd itemProp="author">{book.author}</dd>
            <dt>Publisher</dt>
            <dd itemProp="publisher">{book.publisher}</dd>
            <dt>Language</dt>
            <dd itemProp="inLanguage">{book.language}</dd>
            <dt>Pages</dt>
            <dd itemProp="numberOfPages">{book.pages}</dd>
            <dt>Published</dt>
            <dd itemProp="datePublished">
               <time dateTime={book.published}>{book.published}</time>
            </dd>
            <dt>ISBN</dt>
            <dd itemProp="isbn">{book.ISBN}</dd>
         </dl>
      </div>
   );

   return (
      <article
         className="media flex-column flex-md-row"
         itemScope
         itemType="http://schema.org/Book"
      >
         <div className="mb-2 mb-md-0 mr-md-3">{cover}</div>
         <div className="media-body">{content}</div>
      </article>
   );
};

ReviewedBook.propTypes = {
   author: PropTypes.string.isRequired,
   cover: PropTypes.string,
   description: PropTypes.string.isRequired,
   ISBN: PropTypes.string,
   language: PropTypes.string,
   pages: PropTypes.number,
   published: PropTypes.string,
   publisher: PropTypes.string,
   title: PropTypes.string.isRequired,
   url: PropTypes.string
};

export default ReviewedBook;
