import PropTypes from 'prop-types';
import React from 'react';

import NetMagazineLogo from './net-magazine-logo.jpg';
import ModernWebLogo from './modernweb-logo.svg';
import NetorialsLogo from './netorials-logo.svg';
import PHPArchitectLogo from './phparchitect-logo.svg';
import SitePointLogo from './sitepoint-logo.svg';
import TelerikLogo from './telerik-logo.png';
import TutsPlusLogo from './tutsplus-logo.jpg';
import WebAndPHPMagazineLogo from './web-&-php-magazine-logo.jpg';

const ICONS = {
   'Net Magazine': NetMagazineLogo,
   'Telerik Developer Network': TelerikLogo,
   'Web & PHP Magazine': WebAndPHPMagazineLogo,
   'php[architect]': PHPArchitectLogo,
   ModernWeb: ModernWebLogo,
   Netorials: NetorialsLogo,
   SitePoint: SitePointLogo,
   TutsPlus: TutsPlusLogo
};

const PublisherIcon = ({ type, className, ...others }) => (
   <img src={ICONS[type]} alt={`${type} logo`} {...others} />
);

PublisherIcon.propTypes = {
   className: PropTypes.string,
   type: PropTypes.string.isRequired
};

export default PublisherIcon;
