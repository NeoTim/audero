import AuthoredBook from '../components/authored-book';
import PageTitle from '../components/page-title';
import React from 'react';
import ReviewedBook from '../components/reviewed-book';

const getCoverPath = (covers, coverName) => {
   const cover = covers.find(cover => cover.node.base === coverName);
   return cover ? cover.node.publicURL : null;
};

const renderIntro = () => (
   <div className="container">
      <PageTitle iconType="book" title="Books" />
      <div className="lead">
         <p>
            If I had the chance to learn so many things is also because of the
            books I read. I strongly believe in the importance of sharing what I
            know through books.
         </p>
         <p>
            For this reason, I worked with some of the leading companies in the
            industry to publish books that are easy to understand and whose aim
            is teach techniques that developers can apply in their day-to-day
            work.
         </p>
      </div>
   </div>
);

const BooksPage = ({ data }) => (
   <main>
      <article>
         {renderIntro()}

         <section className="container island">
            <h3 className="h2">Authored books</h3>
            <div className="mt-5">
               {data.authored.edges.map((book, index) => (
                  <AuthoredBook
                     {...book.node}
                     key={book.node.title}
                     className={index > 0 ? 'mt-5' : ''}
                     hasCoverOnLeft={index % 2 === 0}
                     cover={getCoverPath(data.covers.edges, book.node.cover)}
                  />
               ))}
            </div>
         </section>

         <section className="container island">
            <h3 className="h2">Books reviewed</h3>
            <div className="row mt-5">
               {data.reviewed.edges.map((book, index) => (
                  <div
                     className={`col-lg-6 ${index > 0 ? 'mt-3' : ''} mt-lg-0`}
                     key={book.node.title}
                  >
                     <ReviewedBook
                        {...book.node}
                        key={book.node.name}
                        cover={getCoverPath(data.covers.edges, book.node.cover)}
                     />
                  </div>
               ))}
            </div>
         </section>
      </article>
   </main>
);

export default BooksPage;

export const query = graphql`
   query BooksQuery {
      authored: allAuthoredBooksYaml {
         edges {
            node {
               cover
               url
               freeChapterUrl
               buyUrl
               title
               description
               author
               publisher
               language
               pages
               published
               ISBN
            }
         }
      }
      reviewed: allReviewedBooksYaml {
         edges {
            node {
               cover
               url
               title
               description
               author
               publisher
               language
               pages
               published
               ISBN
            }
         }
      }
      covers: allFile(filter: { relativePath: { regex: "/images/books/" } }) {
         edges {
            node {
               base
               publicURL
            }
         }
      }
   }
`;
