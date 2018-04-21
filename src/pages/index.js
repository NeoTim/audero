import Employer from '../components/employer/employer';
import Link from '../components/link';
import PersonalHighlight from '../components/personal-highlight';
import PullQuote from '../components/pull-quote';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import TechnologyTag from '../components/technology-tag/technology-tag';
import PageIcon from '../components/page-icon/page-icon';

import AurelioPicture from '../images/aurelio-de-rosa-headshot.jpg';

const getEmployerLogoPath = (employers, employerName) => {
   const logoName = `${employerName.toLowerCase().replace(/ /g, '-')}-logo`;
   const employer = employers.find(employer => employer.node.name === logoName);
   return employer ? employer.node.publicURL : null;
};

const getLastTalk = talks =>
   talks
      .sort((a, b) => {
         const dateA = new Date(a.node.givenAt[0].date);
         const dateB = new Date(b.node.givenAt[0].date);

         return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 1)
      .pop();

const renderIntro = siteTitle => (
   <div className="bg-light py-5">
      <header className="container">
         <div className="row justify-content-center text-center">
            <div className="col-md-10 col-lg-8">
               <img
                  src={AurelioPicture}
                  className="img-fluid rounded-circle"
                  alt="Aurelio De Rosa"
                  width={150}
               />

               <h1 className="display-3">{siteTitle}</h1>

               <p className="lead mt-3">
                  Senior Front End Engineer at Facebook. In love with HTML, CSS,
                  Sass, JavaScript, and PHP. Member of the{' '}
                  <Link to="https://jquery.org/team/">jQuery team</Link>. Expert
                  of JavaScript and HTML5 APIs.
               </p>
            </div>
         </div>
      </header>
   </div>
);

const renderPersonalHighlights = highlights => (
   <section className="container my-3 my-lg-5">
      <div className="row justify-content-center">
         <div className="col-lg-8">
            <div className="row">
               {highlights.map((highlight, index) => (
                  <div
                     className={`col-md-6 ${index > 0 ? 'mt-3' : ''} ${
                        index > 1 ? 'mt-md-5' : 'mt-md-0'
                     }`}
                     key={highlight.node.title}
                  >
                     <PersonalHighlight {...highlight.node} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   </section>
);

const renderEmployers = (employers, employersLogos) => (
   <section className="jumbotron jumbotron-fluid">
      <div className="container">
         <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
               <h2>I have worked with</h2>

               <ul className="list-inline mt-4">
                  {employers.map(employer => (
                     <li
                        className="list-inline-item m-3 my-lg-4 align-middle"
                        key={employer.node.name}
                     >
                        <Employer
                           logo={getEmployerLogoPath(
                              employersLogos,
                              employer.node.name
                           )}
                           {...employer.node}
                        />
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   </section>
);

const lastEndeavors = (lastArticle, lastBook, lastProject, lastTalk) => (
   <div className="container mt-5">
      <section className="row justify-content-center">
         <div className="col-md-10 col-lg-8">
            <h2>Checkout some of my recent endeavors</h2>

            <div className="mt-4 pl-md-4">
               <article className="media flex-column flex-sm-row">
                  <div className="mb-2 mb-sm-0 mr-sm-3 mt-sm-1">
                     <PageIcon type="writing" width={64} />
                  </div>
                  <div className="media-body mw-100 border-bottom">
                     <h3>
                        Writing:{' '}
                        <Link to={lastArticle.url}>{lastArticle.title}</Link>
                     </h3>
                     <ul
                        className="list-inline mt-4 text-truncate"
                        style={{ color: 'transparent' }}
                     >
                        {lastArticle.tags.sort().map(tag => (
                           <li className="list-inline-item mr-3" key={tag}>
                              <TechnologyTag name={tag} />
                           </li>
                        ))}
                     </ul>
                  </div>
               </article>

               <article className="media flex-column flex-sm-row mt-5">
                  <div className="mb-2 mb-sm-0 mr-sm-3 mt-sm-1">
                     <PageIcon type="project" width={64} />
                  </div>
                  <div className="media-body mw-100 border-bottom">
                     <h3>
                        Project:{' '}
                        <Link to={lastProject.url}>{lastProject.name}</Link>
                     </h3>
                     <ReactMarkdown source={lastProject.description} />
                  </div>
               </article>

               <article className="media flex-column flex-sm-row mt-5">
                  <div className="mb-2 mb-sm-0 mr-sm-3 mt-sm-1">
                     <PageIcon type="speaking" width={64} />
                  </div>
                  <div className="media-body mw-100 border-bottom">
                     <h3>
                        Speaking:{' '}
                        <Link to={lastTalk.givenAt[0].slidesUrl}>
                           {lastTalk.title}
                        </Link>{' '}
                        at {lastTalk.givenAt[0].name}
                     </h3>
                     <ReactMarkdown source={lastTalk.description} />
                  </div>
               </article>

               <article className="media flex-column flex-sm-row mt-5">
                  <div className="mb-2 mb-sm-0 mr-sm-3 mt-sm-1">
                     <PageIcon type="book" width={64} />
                  </div>
                  <div className="media-body mw-100 border-bottom">
                     <h3>
                        Book: <Link to={lastBook.url}>{lastBook.title}</Link>
                     </h3>
                     <ReactMarkdown source={lastBook.description} />
                  </div>
               </article>
            </div>
         </div>
      </section>
   </div>
);

const renderTestimonials = testimonials => (
   <section>
      <h2>Nice things people said about me</h2>

      <ul>
         {testimonials.map(testimonial => (
            <li key={testimonial.node.author}>
               <PullQuote {...testimonial.node} />
            </li>
         ))}
      </ul>
   </section>
);

const IndexPage = ({ data }) => {
   const lastArticle = data.lastArticle.edges[0].node;
   const lastBook = data.lastBook.edges[0].node;
   const lastProject = data.lastProject.edges[0].node;
   const lastTalk = getLastTalk(data.talks.edges).node;

   return (
      <div>
         {renderIntro(data.site.siteMetadata.title)}

         <main>
            {renderPersonalHighlights(data.highlights.edges)}

            {renderEmployers(data.employers.edges, data.employersLogos.edges)}

            {lastEndeavors(lastArticle, lastBook, lastProject, lastTalk)}
         </main>
      </div>
   );
};

export default IndexPage;

export const query = graphql`
   query DataQuery {
      site {
         siteMetadata {
            title
         }
      }
      highlights: allPersonalHighlightsYaml {
         edges {
            node {
               description
               icon
               title
            }
         }
      }
      employers: allEmployersYaml {
         edges {
            node {
               name
               url
            }
         }
      }
      employersLogos: allFile(
         filter: { relativePath: { regex: "/images/employers/" } }
      ) {
         edges {
            node {
               name
               publicURL
            }
         }
      }
      testimonials: allTestimonialsYaml {
         edges {
            node {
               author
               picture
               quote
            }
         }
      }
      lastArticle: allArticlesYaml(
         limit: 1
         sort: { fields: [date], order: DESC }
      ) {
         edges {
            node {
               tags
               title
               url
            }
         }
      }
      lastProject: allProjectsYaml(
         limit: 1
         sort: { fields: [date], order: DESC }
      ) {
         edges {
            node {
               url
               name
               description
            }
         }
      }
      lastBook: allAuthoredBooksYaml(
         limit: 1
         sort: { fields: [published], order: DESC }
      ) {
         edges {
            node {
               url
               title
               description
            }
         }
      }
      talks: allTalksYaml {
         edges {
            node {
               title
               description
               givenAt {
                  name
                  website
                  date
                  slidesUrl
               }
            }
         }
      }
   }
`;
