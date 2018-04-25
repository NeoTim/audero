import Link from '../link';
import React from 'react';

import EmailIcon from './email.svg';
import TwitterIcon from './twitter.svg';
import GitHubIcon from './github.svg';
import LinkedInIcon from './linkedin.svg';

const SOCIALS = [
   {
      name: 'Email',
      icon: EmailIcon,
      url: 'mailto:a.derosa@audero.it'
   },
   {
      name: 'Twitter',
      icon: TwitterIcon,
      url: 'https://www.twitter.com/AurelioDeRosa'
   },
   {
      name: 'GitHub',
      icon: GitHubIcon,
      url: 'https://github.com/AurelioDeRosa'
   },
   {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      url: 'https://www.linkedin.com/in/aurelioderosa'
   }
];

const renderItem = ({ name, icon, url }) => {
   return (
      <li className="list-inline-item" key={name} style={{ maxWidth: '20%' }}>
         <Link className="d-inline-block" to={url}>
            <img className="img-fluid" src={icon} alt="" width={64} />
            <span className="sr-only">{name}</span>
         </Link>
      </li>
   );
};

const Footer = () => (
   <footer className="container text-center mt-5 pt-4 border-top">
      <h2 className="sr-only">You can reach me via</h2>
      <ul className="list-inline mb-4">
         {SOCIALS.map(social => renderItem(social))}
      </ul>
      <p className="text-secondary">
         Copyright © 2013 - {new Date().getFullYear()} Aurelio De Rosa
      </p>
   </footer>
);

export default Footer;
