import Article from '../components/article';
import ArticlesFilter from '../components/articles-filter/articles-filter';
import Link from '../components/link';
import PageTitle from '../components/page-title';
import Publication from '../components/publication/publication';
import React from 'react';

const SHOW_MORE_ITEMS = 9;

const renderIntro = () => (
   <div className="container">
      <PageTitle iconType="writing" title="Publications" />
      <p className="lead">
         Writing is a great passion and something I really enjoy doing,
         especially because it allows me to give back to the industry I'm part
         of. Since I started my professional career, I've invested a lot of time
         in writing academic papers and technical articles. In this page, you
         can find a list of my writings.
      </p>
   </div>
);

const renderVisibleArticles = articles => {
   if (articles.length === 0) {
      return (
         <div className="text-center">
            <p className="h3 font-italic">
               No articles match the selected criteria
            </p>
         </div>
      );
   }

   return (
      <ul className="row list-unstyled">
         {articles.map((article, index) => (
            <li
               className={`col-12 col-sm-6 col-md-4 ${
                  index > 0 ? 'mt-4' : ''
               } ${index > 1 ? '' : 'mt-sm-0'} ${
                  index > 2 ? 'mt-md-5' : 'mt-md-0'
               }`}
               key={article.node.title}
            >
               <Article {...article.node} />
            </li>
         ))}
      </ul>
   );
};

const renderPublications = publications => (
   <section className="container island">
      <h3>Academic papers</h3>
      <p>
         During my career, I've been involved in a number of academic projects
         resulted in the publications of academic papers and presentations. So
         far, I've published <b>{publications.totalCount}</b> papers and I've
         also been cited a few times for these and other works. Below you can
         see my academic publications but you can also check{' '}
         <Link to="https://scholar.google.co.uk/citations?user=ThNwzTgAAAAJ">
            my Google Scholar profile
         </Link>:
      </p>

      <ul className="row justify-content-center list-unstyled mt-5">
         {publications.edges.map((publication, index) => (
            <li
               className={`col-lg-5 ${index > 0 ? 'mt-4' : ''} ${
                  index > 1 ? '' : 'mt-lg-0'
               }`}
               key={publication.node.title}
            >
               <Publication {...publication.node} />
            </li>
         ))}
      </ul>
   </section>
);

const filterArticles = (articles, tags) =>
   articles.filter(article =>
      tags.every(tag => article.node.tags.includes(tag))
   );

export default class PublicationsPage extends React.Component {
   constructor(props) {
      super(props);

      const tagsSet = new Set(
         props.data.articles.edges
            .map(article => article.node.tags)
            .reduce((current, tags) => current.concat(tags), [])
      );
      // TODO: Understand why [...tagsSet.values()] don't work
      const tagsAvailable = [];
      for (const tag of tagsSet) {
         tagsAvailable.push(tag);
      }

      this.state = {
         tagsAvailable: tagsAvailable,
         tagsSelected: [],
         visibleArticles: props.data.articles.edges.slice(0, SHOW_MORE_ITEMS)
      };
   }

   render() {
      return (
         <main>
            <article>
               {renderIntro()}

               <section className="container island">
                  <h3>Articles</h3>
                  <p>
                     When not busy writing code, I love to share my knowledge by
                     writing technical articles for leading networks, such as{' '}
                     <Link to="http://www.sitepoint.com/author/aderosa/">
                        SitePoint
                     </Link>{' '}
                     and{' '}
                     <Link to="http://tutsplus.com/authors/aurelio-de-rosa">
                        TutsPlus
                     </Link>, and magazines, such as{' '}
                     <Link to="http://www.creativebloq.com/net-magazine">
                        Net Magazine
                     </Link>{' '}
                     and{' '}
                     <Link to="https://www.phparch.com/">php[architect]</Link>.
                     To date, I've written{' '}
                     <b>{this.props.data.articles.totalCount}</b> articles on
                     websites or magazines not owned by me:
                  </p>

                  <div className="row justify-content-end my-5">
                     <ArticlesFilter
                        className="col-md-10 col-lg-6"
                        onChange={tags => this._onFilterChanged(tags)}
                        tagsAvailable={this.state.tagsAvailable.filter(
                           tag => !this.state.tagsSelected.includes(tag)
                        )}
                        tagsSelected={this.state.tagsSelected}
                     />
                  </div>

                  {renderVisibleArticles(this.state.visibleArticles)}

                  {this._renderButtons()}
               </section>

               {renderPublications(this.props.data.publications)}
            </article>
         </main>
      );
   }

   _onFilterChanged(tags) {
      const validTags = tags.filter(tag =>
         this.state.tagsAvailable.includes(tag)
      );

      this.setState({
         tagsSelected: validTags,
         visibleArticles: filterArticles(
            this.props.data.articles.edges,
            tags
         ).slice(0, SHOW_MORE_ITEMS)
      });
   }

   _renderButtons() {
      const matchingArticles = filterArticles(
         this.props.data.articles.edges,
         this.state.tagsSelected
      );
      if (this.state.visibleArticles.length === matchingArticles.length) {
         return null;
      }

      return (
         <div className="text-center mt-5">
            <button className="btn btn-primary" onClick={this._onShowMore}>
               Show more
            </button>
            <button
               className="btn btn-outline-secondary ml-2"
               onClick={this._onShowAll}
            >
               Show all
            </button>
         </div>
      );
   }

   _onShowMore = () => {
      const currentVisibleArticles = this.state.visibleArticles.length;

      this.setState({
         visibleArticles: filterArticles(
            this.props.data.articles.edges,
            this.state.tagsSelected
         ).slice(0, currentVisibleArticles + SHOW_MORE_ITEMS)
      });
   };

   _onShowAll = () => {
      this.setState({
         visibleArticles: filterArticles(
            this.props.data.articles.edges,
            this.state.tagsSelected
         ).slice()
      });
   };
}

export const query = graphql`
   query PublicationsQuery {
      articles: allArticlesYaml(sort: { fields: [date], order: DESC }) {
         totalCount
         edges {
            node {
               date
               publisher
               publisherUrl
               tags
               title
               url
            }
         }
      }
      publications: allPublicationsYaml(sort: { fields: [year], order: DESC }) {
         totalCount
         edges {
            node {
               reference
               title
               url
            }
         }
      }
   }
`;
