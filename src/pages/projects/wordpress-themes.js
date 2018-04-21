import Link from '../../components/link';
import PageTitle from '../../components/page-title';
import React from 'react';
import { withPrefix } from 'gatsby-link';

const AnemolifPage = () => (
   <main className="container">
      <div>
         <PageTitle iconType="software" title="WordPress Themes" />
         <p>
            WordPress is the most used{' '}
            <abbr title="Content Management System">CMS</abbr> in the world. A
            CMS is a software that allows publishing, editing and managing
            content easily and quickly, usually without (almost) any knowledge.
            Themes allow you to change the look and features of a website or a
            blog based on WordPress without altering the contents or the
            structure.
         </p>
         <p>
            Many years ago, I developed a theme for my girlfriend and I'm
            keeping this page alive for historical reasons only.
         </p>
         <article>
            <h3>Annarita</h3>
            <img
               className="img-fluid my-3"
               src="https://wp-themes.com/wp-content/themes/annarita/screenshot.png"
               alt="Annarita theme screenshot"
            />
            <p>
               <Link to="https://wordpress.org/themes/annarita/">Annarita</Link>{' '}
               is a very lightweight and adaptable theme based on HTML5 and
               CSS3. It lets you to create custom menu, sidebars, header image,
               background and support for featured images and it shows a special
               ribbon for "sticky" posts. It has the support to customize some
               settings of the theme. The sidebars can be hidden by the users
               with a click and this status can be persistent (if the admin
               enables the relative setting saving the preference using cookie
               in the Settings page). Basically it supports related posts and
               microformats as hcard and hreview (using a custom post type). For
               the reviews the theme has a custom widget to best show them.
               Annarita has two dedicated areas to publish advertisements, one
               above the header and one in the footer.
            </p>
            <div className="text-center my-3">
               <Link
                  to="https://wordpress.org/themes/annarita/"
                  className="btn btn-primary btn-lg"
               >
                  Theme Page
               </Link>
               <Link
                  to="https://wp-themes.com/annarita/?TB_iframe=true&amp;width=1810&amp;height=975"
                  className="ml-2 btn btn-outline-secondary btn-lg"
               >
                  Live Preview
               </Link>
            </div>
            <small>
               I would like to thank{' '}
               <Link to="http://www.francescodecaprariis.it">
                  Francesco Antonio de Caprariis
               </Link>{' '}
               for the header's photo.
            </small>
         </article>
      </div>
   </main>
);

export default AnemolifPage;
