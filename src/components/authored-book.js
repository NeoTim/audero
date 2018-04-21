import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from './link';

const renderCover = (url, cover, title, hasCoverOnLeft = true) => (
   <div className={`mb-2 mb-md-0 ${hasCoverOnLeft ? 'mr-md-3' : 'ml-md-3'}`}>
      <Link to={url} className="d-inline-block" tabIndex="-1">
         <img
            alt={`Cover of ${title}`}
            className="border"
            height={260}
            itemProp="image"
            src={cover}
         />
      </Link>
   </div>
);

const renderFreeChapterButton = url => (
   <Link to={url} className="btn btn-outline-secondary mt-2 mt-sm-0 ml-sm-2">
      Read a free chapter
   </Link>
);

const renderBuyButton = url => (
   <Link to={url} className="btn btn-primary">
      Buy the book
   </Link>
);

const AuthoredBook = ({ className, hasCoverOnLeft = true, ...book }) => {
   const freeChapterButton = book.freeChapterUrl
      ? renderFreeChapterButton(book.freeChapterUrl)
      : null;
   const buyButton = book.buyUrl ? renderBuyButton(book.buyUrl) : null;
   const cover = book.cover
      ? renderCover(book.url, book.cover, book.title, hasCoverOnLeft)
      : null;
   const content = (
      <div className="media-body">
         <h4 itemProp="name">
            <Link to={book.url}>{book.title}</Link>
         </h4>
         <div className="lead" itemProp="description">
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
         <div className="d-flex flex-column flex-sm-row">
            {buyButton}
            {freeChapterButton}
         </div>
      </div>
   );

   return (
      <article
         className={`media ${
            hasCoverOnLeft ? 'flex-column' : 'flex-column-reverse'
         } flex-md-row ${className || ''}`}
         itemScope
         itemType="http://schema.org/Book"
      >
         {hasCoverOnLeft ? cover : content}
         {hasCoverOnLeft ? content : cover}
      </article>
   );
};

AuthoredBook.propTypes = {
   author: PropTypes.string.isRequired,
   buyUrl: PropTypes.string,
   className: PropTypes.string,
   cover: PropTypes.string,
   description: PropTypes.string.isRequired,
   freeChapterUrl: PropTypes.string,
   hasCoverOnLeft: PropTypes.bool,
   ISBN: PropTypes.string,
   language: PropTypes.string,
   pages: PropTypes.number,
   published: PropTypes.string,
   publisher: PropTypes.string,
   title: PropTypes.string.isRequired,
   url: PropTypes.string
};

export default AuthoredBook;
