import GatsbyLink from 'gatsby-link';
import React from 'react';

const Link = ({ children, to, ...others }) => {
   const isBlogLink = /^\/blog\//.test(to);
   if (isBlogLink) {
      return (
         <a href={to} {...others}>
            {children}
         </a>
      );
   }

   const isInternalLink = /^\/(?!\/)/.test(to);
   if (isInternalLink) {
      return (
         <GatsbyLink to={to} {...others}>
            {children}
         </GatsbyLink>
      );
   }

   return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...others}>
         {children}
      </a>
   );
};

export default Link;
