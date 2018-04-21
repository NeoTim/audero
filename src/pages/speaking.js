import Img from 'gatsby-image';
import ImageGallery from 'react-image-gallery';
import Link from '../components/link';
import PageTitle from '../components/page-title';
import React from 'react';
import Talk from '../components/talk/talk';

const IMAGES_DATA = [
   {
      name:
         'aurelio-de-rosa-facebook-italian-universities-tour-2017-naples-2.jpg',
      alt:
         'Aurelio De Rosa speaking at Facebook Italian Universities Tour 2017 - Naples'
   },
   {
      name: 'aurelio-de-rosa-jsday-2015.jpg',
      alt: 'Aurelio De Rosa speaking at jsDay 2015'
   },
   {
      name: 'aurelio-de-rosa-facebook-italian-universities-tour-2017-rome.jpg',
      alt:
         'Aurelio De Rosa speaking at Facebook Italian Universities Tour 2017 - Rome'
   },
   {
      name: 'aurelio-de-rosa-webtech-conference-2014.jpg',
      alt: 'Aurelio De Rosa speaking at WebTech 2014'
   },
   {
      name: 'aurelio-de-rosa-lws-july-2014.jpg',
      alt: 'Aurelio De Rosa speaking at London Web Standards'
   },
   {
      name: 'aurelio-de-rosa-facebook-italian-universities-tour-2017-padua.jpg',
      alt:
         'Aurelio De Rosa speaking at Facebook Italian Universities Tour 2017 - Padua'
   },
   {
      name: 'aurelio-de-rosa-4developers-2015.jpg',
      alt: 'Aurelio De Rosa speaking at 4Developers 2015'
   },
   {
      name: 'aurelio-de-rosa-topconf-tallinn-2015.jpg',
      alt: 'Aurelio De Rosa speaking at Topconf Tallinn 2015'
   }
   // {
   //    name:
   //       'aurelio-de-rosa-4developers-2014.jpg',
   //    alt: 'Aurelio De Rosa speaking at 4Developers 2014'
   // },
   // {
   //    name: 'aurelio-de-rosa-facebook-italian-universities-tour-2017-naples.jpg',
   //    alt: 'Aurelio De Rosa speaking at University of Naples Federico II'
   // }
];

const getImageData = (images, imageName, type) => {
   const image = images.find(image => image.node.base === imageName);
   return image ? image.node.childImageSharp[type] : null;
};

const renderIntro = () => (
   <section className="container">
      <PageTitle iconType="speaking" title="Speaking" />
      <p className="lead">
         I love speaking about HTML, CSS, PHP, JavaScript, Web APIs, jQuery, and
         many other topics. If you would like me to give a presentation at one
         of your events, send me an email at{' '}
         <Link to="mailto:a.derosa@audero.it">a.derosa@audero.it</Link>.
      </p>
   </section>
);

const renderImagesGrid = images => (
   <section className="container d-none d-md-block my-3">
      <div className="row no-gutters">
         {images.map(image => (
            <div key={image.sizes.src} className="col-md-3">
               <Img
                  {...image}
                  outerWrapperClassName="h-100"
                  className="img-fluid h-100"
                  style={{ objectFit: 'cover' }}
               />
            </div>
         ))}
      </div>
   </section>
);

const renderGallery = images => (
   <section className="container d-md-none my-3">
      <ImageGallery
         items={images}
         lazyLoad={true}
         showThumbnails={false}
         showFullscreenButton={false}
         showPlayButton={false}
         preventDefaultTouchmoveEvent={true}
      />
   </section>
);

const SpeakingPage = ({ data }) => (
   <main>
      <article>
         {renderIntro()}

         {renderImagesGrid(
            IMAGES_DATA.map(image => {
               return {
                  sizes: {
                     ...getImageData(data.images.edges, image.name, 'grid')
                  },
                  alt: image.alt
               };
            })
         )}

         {renderGallery(
            IMAGES_DATA.map(image => {
               const imageData = getImageData(
                  data.images.edges,
                  image.name,
                  'gallery'
               );

               return {
                  ...imageData,
                  original: imageData.src,
                  originalAlt: image.alt,
                  description: image.alt
               };
            })
         )}

         <section className="container island">
            <div className="row justify-content-center">
               <section className="col-md-8">
                  <h3>Past talks</h3>
                  {data.talks.edges.map((talk, index) => (
                     <Talk
                        key={talk.node.title}
                        className="border-bottom pb-3 mt-5"
                        {...talk.node}
                     />
                  ))}
               </section>
            </div>
         </section>
      </article>
   </main>
);

export default SpeakingPage;

export const query = graphql`
   query TalksQuery {
      talks: allTalksYaml {
         edges {
            node {
               description
               givenAt {
                  date
                  location
                  name
                  slidesUrl
                  videoUrl
                  website
               }
               speakerdeckId
               tags
               title
            }
         }
      }
      images: allFile(
         filter: { relativePath: { regex: "/images/speaking/" } }
      ) {
         edges {
            node {
               base
               childImageSharp {
                  grid: sizes(maxWidth: 300, quality: 100) {
                     ...GatsbyImageSharpSizes
                  }
                  gallery: sizes(maxWidth: 550, maxHeight: 350, quality: 100) {
                     ...GatsbyImageSharpSizes
                  }
               }
            }
         }
      }
   }
`;
