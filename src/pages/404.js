import PageTitle from '../components/page-title';
import React from 'react';

import errorImage from '../images/404-error.png';

const NotFoundPage = () => (
   <main className="container">
      <PageTitle title="404 error - Page not found" />
      <div className="media flex-column flex-md-row my-5">
         <img
            className="img-fluid mb-2 mb-md-0 mr-md-3"
            src={errorImage}
            alt=""
            width={200}
         />
         <div className="media-body lead">
            <p>
               What a shame, this is so embarrassing! I'm sorry but the page you
               were looking for isn't available anymore. Bad link? Mistyped
               address? Who knows...
            </p>
            <p>
               Anyway, feel free to continue navigating my website using the
               navigation menu to see other cool stuff.
            </p>
         </div>
      </div>
   </main>
);

export default NotFoundPage;
